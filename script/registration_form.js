// registration_form.js
$(document).ready(() => {
  populateDateDropdowns()
  checkForEditMode()
  $("#employeeForm").on("submit", handleFormSubmit)
})

function populateDateDropdowns() {
  const daySelect = $('select[name="day"]')
  const monthSelect = $('select[name="month"]')
  const yearSelect = $('select[name="year"]')

  // Populate days
  for (let i = 1; i <= 31; i++) {
    daySelect.append(`<option value="${i}">${i}</option>`)
  }

  // Populate months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  months.forEach((month) => {
    monthSelect.append(`<option value="${month}">${month}</option>`)
  })

  // Populate years
  const currentYear = new Date().getFullYear()
  for (let i = currentYear; i >= currentYear - 5; i--) {
    yearSelect.append(`<option value="${i}">${i}</option>`)
  }
}

function checkForEditMode() {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('edit') === 'true') {
    // We're in edit mode
    const employeeData = {
      id: urlParams.get('id'),
      name: urlParams.get('name'),
      gender: urlParams.get('gender'),
      departments: urlParams.get('departments').split(','),
      salary: urlParams.get('salary'),
      startDate: urlParams.get('startDate'),
      notes: urlParams.get('notes')
    }

    // Populate form with employee data
    $("#name").val(employeeData.name)
    $(`input[name="gender"][value="${employeeData.gender}"]`).prop('checked', true)
    employeeData.departments.forEach(dept => {
      $(`input[name="department"][value="${dept}"]`).prop('checked', true)
    })
    $("#salary").val(employeeData.salary)
    
    // Handle start date
    const [day, month, year] = employeeData.startDate.split(' ')
    $('select[name="day"]').val(day)
    $('select[name="month"]').val(month)
    $('select[name="year"]').val(year)
    
    $("#notes").val(employeeData.notes)

    // Update form title and submit button
    $(".form-title").text("Edit Employee")
    $(".btn-submit").text("Update")
  }
}

function handleFormSubmit(e) {
  e.preventDefault()

  const urlParams = new URLSearchParams(window.location.search)
  const isEdit = urlParams.get('edit') === 'true'
  const employeeId = urlParams.get('id')

  const formData = {
    id: isEdit ? Number(employeeId) : Date.now(),
    name: $("#name").val(),
    gender: $('input[name="gender"]:checked').val(),
    departments: $('input[name="department"]:checked')
      .map(function () {
        return this.value
      })
      .get(),
    salary: $("#salary").val(),
    startDate: `${$('select[name="day"]').val()} ${$('select[name="month"]').val()} ${$('select[name="year"]').val()}`,
    notes: $("#notes").val(),
  }

  const url = isEdit 
    ? `http://localhost:3000/employees/${employeeId}`
    : "http://localhost:3000/employees"

  $.ajax({
    url: url,
    type: isEdit ? "PUT" : "POST",
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: (response) => {
      console.log(`Employee ${isEdit ? 'updated' : 'added'} successfully:`, response)
      window.location.href = "dashboard.html"
    },
    error: (error) => {
      console.error("Error:", error)
      alert(`Error ${isEdit ? 'updating' : 'adding'} employee. Please try again.`)
    },
  })
}