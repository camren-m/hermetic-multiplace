interface SoundService extends Instance {
	ambience: SoundGroup;
	dialogue: SoundGroup;
	music: SoundGroup;
	sfx: SoundGroup;
	loaded: Folder;
}

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
