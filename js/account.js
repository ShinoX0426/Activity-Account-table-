
let deleteButtons = document.querySelectorAll('.deleteBtn');

deleteButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the account name and id from the button's data attributes
        let account = this.dataset.name;
        let accountId = this.dataset.id;

        // Ask the user for confirmation to delete the account
        let response = confirm("Do you want to delete the account " + account + "?");

        // If the user confirms deletion
        if (response) {
            // Send a GET request to delete the account using the fetch API
            fetch('../accounts/deleteaccount.php?id=' + accountId, {
                method: 'GET'
            })
                .then(response => response.text())  // Parse the response as plain text
                .then(data => {
                    // If the server responds with 'success'
                    if (data === 'success') {
                        // Redirect the user to 'accounts.php' (or your accounts list page)
                        window.location.href = 'admin/accounts';
                    }
                });
        }
    });
});