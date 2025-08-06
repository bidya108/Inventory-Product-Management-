// Bottom Navigation Visibility Based on Scroll Position
window.addEventListener('scroll', function () {
  const bottomTabs = document.querySelector('.bottom-tabs');

  // Check if user has reached the bottom of the page
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
    bottomTabs.style.display = 'block'; // Show bottom navigation
  } else {
    bottomTabs.style.display = 'none';  // Hide bottom navigation
  }
});

// Add product to inventory form submission
document.getElementById("inventoryForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get input values
  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  // Create a new row for the table
  const table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${type}</td>
    <td>${name}</td>
    <td>${brand}</td>
    <td>${quantity}</td>
    <td>${price}</td>
    <td>
      <button class="edit" onclick="editItem(this)">Edit</button>
    </td>
  `;

  // Clear the form
  document.getElementById("inventoryForm").reset();
});

// Edit item in the inventory table
// function editItem(button) {
//   const row = button.parentElement.parentElement;

//   // Fill the form with the current row data
//   document.getElementById("type").value = row.cells[0].innerText;
//   document.getElementById("name").value = row.cells[1].innerText;
//   document.getElementById("brand").value = row.cells[2].innerText;
//   document.getElementById("quantity").value = row.cells[3].innerText;
//   document.getElementById("price").value = row.cells[4].innerText;

//   // Remove the row after editing
//   row.remove();
// }

// Image Preview Function
const imageInput = document.getElementById('product-photo');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');

// Preview image when a user selects a file
imageInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;  // Set the preview image
      imagePreview.style.display = 'block'; // Show the preview section
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.style.display = 'none'; // Hide the preview section if no file is selected
  }
});

// Form Submit and Validation
document.getElementById('add-product-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Hide any previous feedback message
  document.getElementById('feedback-message').style.display = 'none';

  const productName = document.getElementById('product-name').value.trim();
  const productPhoto = imageInput.files[0];

  if (!productName || !productPhoto) {
    // Show error feedback
    showFeedback('Please provide both product name and photo.', 'error');
    return;
  }

  // Display loading message while processing the image upload
  showFeedback('Uploading product...', 'info');

  const reader = new FileReader();
  reader.onload = function (e) {
    // Simulate adding the item to the inventory
    setTimeout(() => {
      // Successfully added the product, show success message
      showFeedback(`Product "${productName}" added successfully!`, 'success');

      // Add product to inventory table
      addProductToTable(productName, e.target.result);

      // Clear form and image preview
      document.getElementById('add-product-form').reset();
      imagePreview.style.display = 'none';
    }, 1000); // Simulate a delay in uploading
  };
  reader.readAsDataURL(productPhoto);  // Read the image file as base64 URL
});

// Function to display feedback messages
function showFeedback(message, type) {
  const feedbackElement = document.getElementById('feedback-message');
  feedbackElement.textContent = message;
  feedbackElement.style.display = 'block';

  // Clear previous styles and apply new style based on feedback type
  feedbackElement.className = '';
  if (type === 'success') {
    feedbackElement.style.color = 'green';
  } else if (type === 'error') {
    feedbackElement.style.color = 'red';
  } else {
    feedbackElement.style.color = 'blue';
  }
}

// Function to add product to inventory table
function addProductToTable(name, imageUrl) {
  const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];

  // Create a new row
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${name}</td>
    <td><img src="${imageUrl}" alt="${name}" width="100" height="100"></td>
    <td>
      <button class="edit" onclick="editItem(this)">Edit</button>
    </td>
  `;
}

// Edit item in the table (fill the form with current values)
function editItem(button) {
  const row = button.parentElement.parentElement;

  // Fill the form with the current row data
  document.getElementById('product-name').value = row.cells[0].innerText;
  const imageUrl = row.cells[1].getElementsByTagName('img')[0].src;

  // Set the preview image
  previewImg.src = imageUrl;
  document.getElementById('image-preview').style.display = 'block';

//   // Remove the row after editing
//   row.remove();
 }
// Show bottom navigation when the user reaches the bottom of the page
window.addEventListener('scroll', function() {
  const bottomNav = document.querySelector('.bottom-tabs');
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  // Check if the user has reached the bottom of the page
  if (scrollPosition >= pageHeight) {
    bottomNav.style.display = 'block';  // Show bottom navigation
  } else {
    bottomNav.style.display = 'none';  // Hide bottom navigation
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Event listener for the About Us tab, to show or hide the tab content if needed
  const aboutUsTab = document.querySelector(".about-us-tab");
  const aboutUsButton = document.querySelector(".tab-button");

  // Ensure the About Us button behaves like a clickable tab
  aboutUsButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // You can add additional functionality here if needed, such as loading content dynamically.
    // For now, it will redirect to the About Us page as expected.
    window.location.href = 'aboutus.html'; // Link to the "About Us" page
  });


// delete button

document.addEventListener('DOMContentLoaded', function() {
  // Attach the event listener to the parent table element
  const table = document.getElementById('product-table'); // Assuming this is your table ID

  table.addEventListener('click', function(event) {
    // Check if the clicked element has the class 'Delete'
    if (event.target && event.target.classList.contains('delete')) {
      // Confirm the deletion
      const confirmation = confirm("Are you sure you want to delete this item?");
      
      // If confirmed, remove the corresponding row
      if (confirmation) {
        const row = event.target.closest('tr'); // Find the row containing the delete button
        row.remove(); // Remove the row from the table
      } else {
        alert("Item not deleted.");
      }
    }
  });
});




// To handle dynamically added delete buttons (in case of dynamic row insertion)
function addDeleteButtonToRow(row) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('Delete');  // Use class 'Delete'
  deleteButton.innerText = 'Delete';
  
  // Append the delete button to the last cell in the row (adjust based on your table structure)
  const actionCell = row.insertCell(-1);
  actionCell.appendChild(deleteButton);
}






  // Logout confirmation and redirection to login page
  document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the logout button
    document.getElementById('logout-button').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior

      // Show confirmation dialog
      const confirmation = confirm("Are you sure you want to log out?");
      if (confirmation) {
        // Redirect to login page upon successful logout
        window.location.href = 'login.html'; // Replace '/login' with your actual login page URL
      } else {
        alert("Logout canceled.");
      }
    });
  });
});

