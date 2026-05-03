# 🚦 Traffic Signal Simulator (React)

A simple yet interactive traffic signal simulation built using React, demonstrating real-time state management, timed transitions, and basic real-world traffic behavior.

---

## 🔥 Features

* ⏱ **Timer-based Signal Switching**
  Automatic transition between signals using a fixed time interval.

* 🔁 **State Machine Logic**
  Implements `GREEN → YELLOW → NEXT` signal flow using `useReducer`.

* 🚗 **Dynamic Vehicle Simulation**

  * Vehicles accumulate on red signals
  * Vehicles clear on green signals
  * Signal timing adapts slightly based on traffic load

* 🚑 **Emergency Override System**

  * Instantly prioritizes a selected direction
  * Maintains green signal for emergency duration
  * Resumes normal flow after clearing

---

## 🧠 Tech Stack

* **React**
* **TypeScript**
* **CSS Modules**
* React Hooks:

  * `useReducer`
  * `useEffect`

---

## ⚙️ How It Works

* A timer (`setInterval`) triggers state updates every second
* The reducer manages signal transitions as a **state machine**
* Vehicle counts are updated dynamically:

  * Increase on red signals
  * Decrease on green signals
* Emergency mode overrides normal behavior temporarily

---

## 🚀 Getting Started

1. Clone the repository

```
git clone https://github.com/SnehaMishra05/TrafficSignal.git
```

2. Install dependencies

```
npm install
```

3. Run the app

```
npm run dev
```

---

## 🎯 Key Learnings

* Managing complex state using `useReducer`
* Implementing time-based updates with `useEffect`
* Designing a simple state machine in React
* Balancing real-world modeling with code simplicity

---

## 👩‍💻 Author

Sneha Mishra