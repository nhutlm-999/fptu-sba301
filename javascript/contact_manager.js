
const contacts = [];

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('tel');
const addressInput = document.getElementById('address');
const dobInput = document.getElementById('dob');
const contactTableBody = document.getElementById('contactTableBody');
const submitBtn = document.getElementById('submitBtn');
const title = document.getElementsByClassName('card-header')[0];

function validateName() {
    const val = nameInput.value.trim();
    // Tách chuỗi bằng khoảng trắng và lọc bỏ khoảng trắng thừa
    const words = val.split(/\s+/).filter(word => word.length > 0);
    return words.length >= 2;
}

const validatePhone = () => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneInput.value.trim());
}

const validateAddress = () => {
    return addressInput.value.trim().length > 5;
}

const validateDOB = () => {
    const today = new Date();
    const dob = new Date(dobInput.value);
    return dob <= today;
}

const editContact = (index) => {
    const contact = contacts[index];
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    addressInput.value = contact.address;
    dobInput.value = contact.dob;

    // Remove the contact from the array
    contacts.splice(index, 1);
    renderContactTable();
}

const renderContactTable = () => {
    contactTableBody.innerHTML = contacts.map((contact, index) => {

        return `
        <tr key=${index}>
            <td>${index + 1}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.address}</td>
            <td>${contact.dob}</td>
            <td>
                <button class="btn btn-warning" onclick="editContact(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteContact(${index})">Delete</button>
            </td>
        </tr>`
    }).join('');
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    try {
        if (!validateName()) {
            throw new Error("Please enter a valid name with at least two words.");
        }

        if (!validatePhone()) {
            throw new Error("Please enter a valid phone number.");
        }

        if (!validateAddress()) {
            throw new Error("Please enter a valid address.");
        }

        if (!validateDOB()) {
            throw new Error("Please enter a valid date of birth.");
        }
    } catch (error) {
        alert(error.message); 
        // submitBtn.disabled = true;
        return;
    }


    const newContact = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: addressInput.value.trim(),
        dob: dobInput.value.trim()
    };

    contacts.push(newContact);
    console.log(contacts);

    renderContactTable();
    contactForm.reset();
});

// console.log("id " + idInput.value);