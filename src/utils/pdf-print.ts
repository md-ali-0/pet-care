import jsPDF from "jspdf";

// Predefined feeding chart data
const feedingChartData = {
    toy: [
        { weight: 3, cups: 0.33, calories: 139 },
        { weight: 6, cups: 0.5, calories: 233 },
    ],
    small: [
        { weight: 10, cups: 0.75, calories: 342 },
        { weight: 15, cups: 1, calories: 464 },
        { weight: 20, cups: 1.25, calories: 576 },
    ],
    medium: [
        { weight: 30, cups: 1.75, calories: 781 },
        { weight: 40, cups: 2.25, calories: 969 },
        { weight: 50, cups: 2.75, calories: 1145 },
    ],
    large: [
        { weight: 60, cups: 3, calories: 1313 },
        { weight: 70, cups: 3.5, calories: 1474 },
        { weight: 80, cups: 3.75, calories: 1629 },
        { weight: 90, cups: 4.25, calories: 1926 },
    ],
};

// Function to find the appropriate category and corresponding data
function getFeedingData(weight: number) {
    if (weight <= 6) {
        return { size: "Toy", data: feedingChartData.toy };
    } else if (weight <= 20) {
        return { size: "Small", data: feedingChartData.small };
    } else if (weight <= 50) {
        return { size: "Medium", data: feedingChartData.medium };
    } else {
        return { size: "Large", data: feedingChartData.large };
    }
}

// Function to dynamically generate the PDF based on provided age and weight
export async function handleUserTestReportPdf({ age, weight }: { age: number, weight: number }) {
    // Get the appropriate feeding data based on weight
    const { size, data } = getFeedingData(weight);

    // Find the exact feeding guideline based on weight
    const feedingInfo = data.find(item => weight <= item.weight) || data[data.length - 1];

    // Initialize jsPDF
    const doc = new jsPDF();

    // Title
    doc.setFontSize(25);
    doc.text("Feeding Chart", 20, 20);

    // Subtitle
    doc.setFontSize(12);
    doc.text("Feeding Guidelines for Adult pets", 20, 27);

    // Break Line
    doc.setLineWidth(1);
    doc.line(5, 45, 205, 45);

    // User Info
    doc.setFontSize(15);
    doc.text(`Pet Age: ${age} years`, 20, 55);
    doc.text(`Dog Size: ${size}`, 20, 65);
    doc.text(`Dog Weight: ${weight} lbs`, 20, 75);

    // Break Line
    doc.setLineWidth(0.5);
    doc.line(5, 80, 205, 80);

    // Feeding Info Heading
    doc.setFontSize(20);
    doc.text("Recommended Daily Feeding Information", 110, 90, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(10, 100, 195, 100);

    // Feeding Info Data
    doc.setFontSize(15);
    doc.text(`Cups per Day: ${feedingInfo.cups}`, 20, 110);
    doc.text(`Calories per Day: ${feedingInfo.calories}`, 20, 120);

    // Save the PDF
    doc.save("pet_feeding_chart.pdf");
}
