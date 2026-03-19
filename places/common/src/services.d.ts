interface ReplicatedStorage extends Instance {
	game: Folder & {
		common: Folder & {
			ui: Folder & {
				styles: Folder & {
					["global.style"]: StyleSheet;
				};
			};
		};
	};
}
