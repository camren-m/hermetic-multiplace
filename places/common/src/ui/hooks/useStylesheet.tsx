import { ReplicatedStorage } from "@rbxts/services";
import Vide, { cleanup, effect, Source, source } from "@rbxts/vide";

const GLOBAL_STYLESHEET = ReplicatedStorage.game.common.ui.styles["global.style"];

Vide.defaults = false;
Vide.strict = true;

/**
 * Finds a sibling `.style` suffixed {@link StyleSheet} with the same base name and parent as `target`.
 *
 * @param target The target {@link LuaSourceContainer | Script} instance to find a StyleSheet for.
 * @param autoDeriveGlobal Whether to automatically add a derive from the ``global.style.rsml`` stylesheet to this stylesheet.
 * @returns A Vide source that contains the stylesheet, and is automatically hydrated with its replacement.
 */
export function useStylesheet(target: LuaSourceContainer, autoDeriveGlobal = true): Source<StyleSheet | undefined> {
	const resolveStylesheet = () => {
		const sibling = target.Parent?.FindFirstChild(`${target.Name}.style`);
		if (!sibling?.IsA("StyleSheet")) return;
		return sibling;
	};

	const styleSheet = source<StyleSheet | undefined>(resolveStylesheet());

	effect(() => {
		const currentSheet = styleSheet();
		if (!autoDeriveGlobal) return;
		if (!currentSheet) return;
		if (currentSheet.GetDerives().includes(GLOBAL_STYLESHEET)) return;

		currentSheet.SetDerives([GLOBAL_STYLESHEET, ...currentSheet.GetDerives()]);
	});

	assert(target.Parent, `Cannot resolve stylesheet on ${target.GetFullName()}: no parent`);
	cleanup(
		target.Parent.ChildAdded.Connect(() => {
			if (resolveStylesheet() === styleSheet()) return;

			styleSheet(resolveStylesheet());
		}),
	);

	return styleSheet;
}
