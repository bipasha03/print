printDoc.addEventListener("click", (e) => {
    e.stopPropagation();
    printTextField();
  });
  let printWindow;
  function printTextField() {
    customMenu.classList.remove("active");
    const dimensions = {
      8.5: "11",
      5.5: "8.5",
      11.69: "16.54",
      8.27: "11.69",
      5.83: "8.27",
    };
    let width = (textField.offsetWidth || 595) / 96;
    width = width.toFixed(2);
    const height = dimensions[width] || (textField.offsetHeight || 842) / 96;
    const textFieldContent = textField.innerHTML;
    const styles = window.getComputedStyle(textField);
    const backgroundColor = styles.backgroundColor;
    const fontSize = styles.fontSize;
    const color = styles.color;
    printWindow = window.open("", "", `height=${842},width=${695}`);
    printWindow.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="./assets/css/rich_text.css" />
          <title>Mero Document</title>
          <style>
            @media print {
              @page { 
                size: ${width}in ${height}in; 
                margin: 20px; 
              }
              body {
                margin: 0;
              }
            }
          </style>
        </head>
        <body style="background-color: ${backgroundColor}; color: ${color}; font-size: ${fontSize};">
         <div class="text-field" style="background-color: ${backgroundColor}; color: ${color}; font-size: ${fontSize};">
          ${textFieldContent}
         </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  }
  window.addEventListener('beforeunload', (event) => {
    if (textField && textField.innerHTML.trim() !== '') {
      event.preventDefault();
      event.returnValue = '';
    }
    if (printWindow && !printWindow.closed) {
      printWindow.close();
    }
  });