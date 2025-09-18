import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Song({ route, navigation }) {
  const { song } = route.params; // receives the song from MainPage
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      <Text style={styles.songName}>{song.title}</Text>

      {/* YouTube Player */}
      <YoutubePlayer
        ref={playerRef}
        height={230}
        width={350}
        play={playing}
        videoId={song.youtubeId} // use youtubeId here
        onChangeState={onStateChange}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MainPage")}
      >
        <Text style={styles.backButtonText}>Back to Songs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191414",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1DB954",
    marginBottom: 20,
  },
  songName: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 30,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
