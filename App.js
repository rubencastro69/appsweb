import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, StyleSheet, FlatList, SafeAreaView } from 'react-native';

export default function App() {
  const [city, setCity] = useState("Hermosillo");
  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef(null);

  const API_KEY = "17113b6327a24e86e9a4abaaa1012874";

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Ciudad no encontrada");
      const data = await response.json();
      setCurrentWeather(data.list[0]);
      setWeather(data.list);
    } catch (err) {
      setError(err.message);
      setWeather([]);
      setCurrentWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleInputChange = (value) => {
    setCity(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        fetchWeather(value);
      }
    }, 1000);
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("clear") || desc.includes("sunny")) return "🟠";
    return "⚫";
  };

  const getDayName = (dt) => {
    const date = new Date(dt * 1000);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  };

  const getTime = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.day}>{getDayName(item.dt)}</Text>
        <Text style={styles.icon}>{getWeatherIcon(item.weather[0].description)}</Text>
        <View style={styles.weatherInfo}>
          <Text style={styles.description}>{item.weather[0].description}</Text>
          <Text style={styles.time}>{getTime(item.dt)}</Text>
        </View>
      </View>
      <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa una ciudad"
        placeholderTextColor="#a0aec0"
        value={city}
        onChangeText={handleInputChange}
      />

      {currentWeather && !loading && (
        <View style={styles.currentWeather}>
          <Text style={styles.cityName}>{city.charAt(0).toUpperCase() + city.slice(1)}</Text>
          <Text style={styles.tempLarge}>{Math.round(currentWeather.main.temp)}°C</Text>
          <Text style={styles.descriptionLarge}>{currentWeather.weather[0].description}</Text>
        </View>
      )}

      {loading && (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#60a5fa" />
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      <FlatList
        data={weather}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={renderCard}
        scrollEnabled={true}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "rgba(96, 165, 250, 0.3)",
    borderWidth: 1,
    borderColor: "#60a5fa",
    borderRadius: 20,
    color: "#fff",
    fontSize: 16,
    marginBottom: 30,
  },
  currentWeather: {
    alignItems: "center",
    marginBottom: 40,
  },
  cityName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
  tempLarge: {
    color: "#fff",
    fontSize: 64,
    fontWeight: "700",
    marginBottom: 10,
  },
  descriptionLarge: {
    color: "#cbd5e1",
    fontSize: 18,
    textTransform: "capitalize",
  },
  card: {
    backgroundColor: "rgba(96, 165, 250, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(96, 165, 250, 0.2)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 15,
  },
  day: {
    color: "#fff",
    fontSize: 16,
    minWidth: 70,
  },
  icon: {
    fontSize: 20,
  },
  weatherInfo: {
    flex: 1,
  },
  description: {
    color: "#cbd5e1",
    fontSize: 14,
    textTransform: "capitalize",
  },
  time: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
  temp: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    minWidth: 60,
    textAlign: "right",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorBox: {
    padding: 12,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderWidth: 1,
    borderColor: "#ef4444",
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "#fca5a5",
    fontSize: 14,
  },
});