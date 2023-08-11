class RecentlyPlayedSong {
  constructor(userStorageCapacity) {
    this.userStorageCapacity = userStorageCapacity;
    this.songStore = new Map();
  }

  playSong(user, song) {
    if (!this.songStore.has(user)) {
      this.songStore.set(user, []);
    }
    const userPlaylist = this.songStore.get(user);
    const songIndex = userPlaylist.indexOf(song);

    if (songIndex !== -1) {
      userPlaylist.splice(songIndex, 1);
    }
    userPlaylist.unshift(song);
    if (userPlaylist.length > this.userStorageCapacity) {
      userPlaylist.pop();
    }
  }
  getRecentSongs(user) {
    return this.songStore.get(user) || [];
  }
}

const songStore = new RecentlyPlayedSong(4);

// Example usage
songStore.playSong("user1", "S1");
songStore.playSong("user1", "S2");
songStore.playSong("user1", "S3");

console.log(songStore.getRecentSongs("user1")); // Output: ['S3', 'S2', 'S1']
songStore.playSong("user1", "S4");
songStore.playSong("user1", "S2");
songStore.playSong("user1", "S1");

console.log(songStore.getRecentSongs("user1")); // Output: ['S1', 'S2', 'S4']
