import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainPage({ navigation }) {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    saveSongs(songs);
  }, [songs]);

  const loadSongs = async () => {
    try {
      const storedSongs = await AsyncStorage.getItem('songs');
      if (storedSongs) {
        setSongs(JSON.parse(storedSongs));
      }
    } catch (error) {
      console.error('Error loading songs:', error);
    }
  };

  const saveSongs = async (songsToSave) => {
    try {
      await AsyncStorage.setItem('songs', JSON.stringify(songsToSave));
    } catch (error) {
      console.error('Error saving songs:', error);
    }
  };

  const addSong = () => {
    if (newSong.trim() === "" || youtubeId.trim() === "") {
      Alert.alert("Validation", "Please enter both a song name and YouTube ID.");
      return;
    }
    const song = {
      id: Date.now().toString(),
      title: newSong,
      youtubeId: youtubeId,
    };
    setSongs([...songs, song]);
    setNewSong("");
    setYoutubeId("");
  };

  const deleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const startEditSong = (id, currentTitle) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  const saveEditSong = (id) => {
    if (editingText.trim() === "") {
      Alert.alert("Validation", "Song name cannot be empty.");
      return;
    }
    setSongs(
      songs.map((song) =>
        song.id === id ? { ...song, title: editingText } : song
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingBottom: 20 }]}>
      <View style={styles.container}>
        {/* Profile Button */}
        <View style={styles.profileButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.mainContentText}>Songs</Text>

          {/* Input for Song + YouTube ID */}
          <View style={{ marginBottom: 15 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter song name"
              placeholderTextColor="#999"
              value={newSong}
              onChangeText={setNewSong}
            />
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              placeholder="Enter YouTube ID"
              placeholderTextColor="#999"
              value={youtubeId}
              onChangeText={setYoutubeId}
            />
            <TouchableOpacity
              style={[styles.button, styles.addButton, { marginTop: 10 }]}
              onPress={addSong}
            >
              <Text style={styles.buttonText}>Add Song</Text>
            </TouchableOpacity>
          </View>

          {/* Songs List */}
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={({ item }) => (
              <View style={styles.songItem}>
                {editingId === item.id ? (
                  <TextInput
                    style={[styles.input, styles.editInput]}
                    value={editingText}
                    onChangeText={setEditingText}
                    autoFocus
                  />
                ) : (
                  <Text style={styles.songTitle}>{item.title}</Text>
                )}

                <View style={styles.songActions}>
                  {editingId === item.id ? (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.saveButton]}
                      onPress={() => saveEditSong(item.id)}
                    >
                      <Text style={styles.actionButtonText}>Save</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => startEditSong(item.id, item.title)}
                    >
                      <Text style={styles.actionButtonText}>Edit</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => deleteSong(item.id)}
                  >
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.playButton]}
                    onPress={() => navigation.navigate("Song", { song: item })}
                  >
                    <Text style={styles.actionButtonText}>Play</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* Logout Button */}
        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#191414',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
  },
  profileButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    marginTop: 80,
  },
  mainContentText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#000',
  },
  editInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#1db954',
    marginTop: 8,
  },
  songItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  songActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#1ed760',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#3498db',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#1ed760',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playButton: {
    backgroundColor: "#9b59b6",
    marginLeft: 8,
  },
});
