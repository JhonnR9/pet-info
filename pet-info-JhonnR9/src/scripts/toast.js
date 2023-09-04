

export const toast = (message, logType) => {
      Toastify({
        text: message,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          border: `0.0625rem solid ${logType}`,
          background: "#FFF",
          color: `${logType}`,
          padding: "3rem",
          margin: "5rem",
        }
      }).showToast();
}