import apiService from "./apiService";
import mockDatas from "./mockDatas";

const getApiData = async (apiFunction, userId, shouldMock) => {
  try {
    if (shouldMock) {
      const userIdFormatted = parseInt(userId);
      const datasMocked = mockDatas[apiFunction].filter(
        (data) => data.id === userIdFormatted || data.userId === userIdFormatted
      );
      return datasMocked[0];
    } else {
      const response = await apiService[apiFunction](userId);
      if (!response) {
        return null;
      } else {
        return response.data;
      }
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
};

class DatasFormatter {
  formatUserDatas(userDatas) {
    if (userDatas.todayScore) {
      userDatas.score = userDatas.todayScore;
      delete userDatas.todayScore;
      return userDatas;
    } else {
      return userDatas;
    }
  }

  formatActivityDatas(activitiesDatas) {
    const activitiesDatasFormatted = activitiesDatas.map((session, index) => ({
      ...session,
      day: `${index + 1}`,
    }));

    const kilograms = activitiesDatas.map((session) => session.kilogram);
    const minWeight = Math.min(...kilograms);
    const maxWeight = Math.max(...kilograms);

    return {
      activitiesDatasFormatted,
      minKilos: minWeight,
      maxKilos: maxWeight,
    };
  }

  formatPerformancesDatas(performancesDatas) {
    const PhysicalComponents = [
      "Cardio",
      "Energie",
      "Endurance",
      "Force",
      "Vitesse",
      "Intensité",
    ];
    const performancesDatasFormatted = performancesDatas.map((item, index) => {
      return {
        ...item,
        kind: PhysicalComponents[index],
      };
    });

    return performancesDatasFormatted;
  }

  formatSessionsDatas(sessionsDatas) {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    const sessionsDatasFormatted = sessionsDatas.map((item, index) => {
      return {
        ...item,
        day: days[index],
      };
    });
    return sessionsDatasFormatted;
  }
}

export { getApiData, DatasFormatter };
