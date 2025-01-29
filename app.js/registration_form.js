
        
            document.getElementById('employeeForm').addEventListener('submit', function(e) {
                e.preventDefault();
            
                // Get form values
                const name = document.getElementById('name').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const departments = Array.from(document.querySelectorAll('input[name="department"]:checked'))
                    .map(checkbox => checkbox.value)
                    .join(', '); // Convert array to a comma-separated string
                const salary = document.getElementById('salary').value;
                const startDate = `${document.querySelector('select[name="day"]').value} ${
                    document.querySelector('select[name="month"]').value} ${
                    document.querySelector('select[name="year"]').value}`;
                const profileImage = document.querySelector('input[name="profile"]:checked').value;
                const notes = document.getElementById('notes').value;
            
                // Convert form data to a string
                const employeeData = `Name: ${name}, Gender: ${gender}, Department: ${departments}, Salary: ${salary}, Start Date: ${startDate}, Profile Image: ${profileImage}, Notes: ${notes}`;
            
                // Get existing data or initialize an empty string
                let storedEmployees = localStorage.getItem('employees') || '';
                
                // Append new data
                 storedEmployees += employeeData + '\n';  
                
                // Store updated data
                localStorage.setItem('employees', storedEmployees);

                console.log('Stored Employee Data:', localStorage.getItem('employees'));
            
               
            });        

    // Populate date dropdowns
    function populateDates() {
        const daySelect = document.querySelector('select[name="day"]');
        const monthSelect = document.querySelector('select[name="month"]');
        const yearSelect = document.querySelector('select[name="year"]');

        // Populate days
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Populate months
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        // Populate years
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 5; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }

    // Call on page load
    populateDates();
    
