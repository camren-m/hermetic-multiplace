interface ReplicatedStorage extends Instance {
	meme: Folder & {
		common: Folder & {
			ui: Folder & {
				styles: Folder & {
					["global.style"]: StyleSheet;
				};
			};
		};
	};
}
