// dashboard.js
$(document).ready(() => {
  loadEmployees()
})

function loadEmployees() {
  $.ajax({
    url: "http://localhost:3000/employees",
    type: "GET",
    success: (employees) => {
      displayEmployees(employees)
    },
    error: (error) => {
      console.error("Error loading employees:", error)
      alert("Error loading employees. Please try again.")
    },
  })
}

function displayEmployees(employees) {
  const tbody = $("tbody")
  tbody.empty()

  employees.forEach((employee) => {
    const row = $("<tr>").html(`
            <td>
                <div class="employee-info">
                    <img src="/placeholder.svg?height=40&width=40" alt="Employee" class="employee-avatar">
                    <span>${employee.name}</span>
                </div>
            </td>
            <td>${employee.gender}</td>
            <td>
                <div class="department-tags">
                    ${employee.departments
                      .map(
                        (dept) => `
                        <span class="tag">${dept}</span>
                    `,
                      )
                      .join("")}
                </div>
            </td>
            <td>₹ ${employee.salary}</td>
            <td>${employee.startDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn delete-btn" data-id="${employee.id}">🗑️</button>
                    <button class="action-btn edit-btn" data-id="${employee.id}">✏️</button>
                </div>
            </td>
        `)
    tbody.append(row)
  })

  // Use event delegation for delete buttons
  $(document)
    .off("click", ".delete-btn")
    .on("click", ".delete-btn", function () {
      const id = $(this).data("id")
      deleteEmployee(id)
    })

  // Add event delegation for edit buttons
  $(document)
    .off("click", ".edit-btn")
    .on("click", ".edit-btn", function () {
      const id = $(this).data("id")
      editEmployee(id)
    })
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    $.ajax({
      url: `http://localhost:3000/employees/${id}`,
      type: "DELETE",
      success: (response) => {
        console.log("Employee deleted successfully:", response)
        loadEmployees() // Reload the table
      },
      error: (xhr, status, error) => {
        console.error("Error deleting employee:", error)
        alert("Error deleting employee. Please try again.")
      },
    })
  }
}

// Add edit employee function
function editEmployee(id) {
  $.ajax({
    url: `http://localhost:3000/employees/${id}`,
    type: "GET",
    success: (employee) => {
      // Redirect to registration form with employee data
      const queryParams = new URLSearchParams({
        ...employee,
        departments: employee.departments.join(','),
        edit: true
      }).toString()
      window.location.href = `registration_form.html?${queryParams}`
    },
    error: (error) => {
      console.error("Error fetching employee:", error)
      alert("Error fetching employee data. Please try again.")
    },
  })
}