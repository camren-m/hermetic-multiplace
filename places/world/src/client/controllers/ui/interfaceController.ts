import { Players } from "@rbxts/services";
import { mount } from "@rbxts/vide";

import { Controller, OnStart } from "@flamework/core";

import { GameInterface } from "@world/client/ui/gameInterface";

@Controller()
export class InterfaceController implements OnStart {
	public onStart() {
		mount(GameInterface, Players.LocalPlayer.WaitForChild("PlayerGui", 5));
	}
}
