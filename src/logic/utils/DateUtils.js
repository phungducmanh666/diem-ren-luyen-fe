class DateUtils {
  getCurrentDateFormatted() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
  }

  getCurrentYear() {
    const today = new Date();
    return today.getFullYear();
  }
}

module.exports = new DateUtils();
