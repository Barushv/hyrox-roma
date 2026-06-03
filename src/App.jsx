import { useState } from "react";
import PropTypes from "prop-types";
import { AppProvider, useApp } from "./context/AppContext";
import ProfileSelector from "./components/ProfileSelector";
import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import WeekScreen from "./screens/WeekScreen";
import DayScreen from "./screens/DayScreen";
import TestsScreen from "./screens/TestsScreen";
import ProfileScreen from "./screens/ProfileScreen";

function AppContent() {
  const { activeProfileId } = useApp();
  const [tab, setTab] = useState("home");
  const [weekNav, setWeekNav] = useState(null);
  const [dayView, setDayView] = useState(null); // { week, day }

  if (!activeProfileId) {
    return <ProfileSelector />;
  }

  if (dayView) {
    return (
      <DayScreen
        weekNum={dayView.week}
        dayIndex={dayView.day}
        onBack={() => setDayView(null)}
      />
    );
  }

  function handleTabChange(newTab) {
    setTab(newTab);
    setWeekNav(null);
  }

  function handleNavigateWeek(week) {
    setWeekNav(week);
    setTab("week");
  }

  function handleOpenDay(week, day) {
    setDayView({ week, day });
  }

  return (
    <>
      <main className="max-w-lg mx-auto">
        {tab === "home" && (
          <HomeScreen
            onNavigateWeek={handleNavigateWeek}
            onOpenDay={handleOpenDay}
          />
        )}
        {tab === "week" && (
          <WeekScreen initialWeek={weekNav} onOpenDay={handleOpenDay} />
        )}
        {tab === "tests" && <TestsScreen />}
        {tab === "profile" && <ProfileScreen />}
      </main>
      <NavBar activeTab={tab} onTabChange={handleTabChange} />
    </>
  );
}

function App({ planData }) {
  return (
    <AppProvider planData={planData}>
      <AppContent />
    </AppProvider>
  );
}

App.propTypes = {
  planData: PropTypes.object.isRequired,
};

export default App;
