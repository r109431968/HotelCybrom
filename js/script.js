
const hotelPrices = {
    'Grand Palace': '$120',
    'Royal Orchid Suites': '$95',
    'Seaside Paradise': '$150'
};

const hotelAmenities = {
    'Grand Palace': ['Free Wi-Fi', 'Swimming Pool', 'Gym', 'Restaurant', 'Spa'],
    'Royal Orchid Suites': ['Free Breakfast', 'Free Wi-Fi', 'Bar', 'Parking', 'Airport Shuttle'],
    'Seaside Paradise': ['Beach Access', 'Free Wi-Fi', 'Restaurant', 'Poolside Bar', 'Fitness Center']
};

const hotelImages = {
    'Grand Palace': "https://images.trvl-media.com/lodging/96000000/95910000/95904200/95904116/w3030h2017x0y1-9877a7a8.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    'Royal Orchid Suites': "https://images.trvl-media.com/lodging/104000000/103810000/103806200/103806162/10596d5a.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    'Seaside Paradise': "https://images.trvl-media.com/lodging/94000000/93050000/93047300/93047252/a43ea3b2.jpg?impolicy=resizecrop&rw=1200&ra=fit"
}

function createHotelCards() {
    const hotelList = document.getElementById('hotel-list');

    Object.keys(hotelPrices).forEach(hotelName => {
        const hotelPrice = hotelPrices[hotelName];
        const hotelCard = document.createElement('div');
        hotelCard.classList.add('hotel-card');

        // Create hotel image
        const hotelImage = document.createElement('img');
        hotelImage.src = hotelImages[hotelName];
        hotelImage.alt = hotelName;

        // Create hotel name
        const hotelTitle = document.createElement('h3');
        hotelTitle.textContent = hotelName;

        // Create hotel price
        const hotelPriceElement = document.createElement('p');
        hotelPriceElement.textContent = `Price: ${hotelPrice}/night`;

        // Create button for redirect
        const checkRoomsButton = document.createElement('button');
        checkRoomsButton.textContent = 'Check Rooms';
        checkRoomsButton.onclick = () => redirectToHotel(hotelName);

        // Append elements to the hotel card
        hotelCard.appendChild(hotelImage);
        hotelCard.appendChild(hotelTitle);
        hotelCard.appendChild(hotelPriceElement);
        hotelCard.appendChild(checkRoomsButton);

        // Append hotel card to the hotel list
        hotelList.appendChild(hotelCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createHotelCards();
});


function bookNow(hotelName) {
    alert(`Booking ${hotelName}...`);
}

// Redirect to booking page from hotel list page
function redirectToHotel(hotelName) {
    if (!hotelPrices[hotelName] || !hotelAmenities[hotelName]) {
        alert('Invalid hotel selection');
        return;
    }

    localStorage.setItem('selectedHotel', JSON.stringify({
        name: hotelName,
        price: hotelPrices[hotelName],
        amenities: hotelAmenities[hotelName]
    }));

    window.location.href = 'hotel-details.html';
}

// Load hotel details and amenities on the booking page
if (window.location.pathname.includes('hotel-details.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const hotelDetails = JSON.parse(localStorage.getItem('selectedHotel'));

        if (hotelDetails) {
            const hotelNameElement = document.getElementById('hotel-name');
            const hotelPriceElement = document.getElementById('hotel-price');
            const amenitiesList = document.getElementById('amenities-list');

            if (hotelNameElement && hotelPriceElement && amenitiesList) {
                hotelNameElement.textContent = hotelDetails.name;
                hotelPriceElement.textContent = hotelDetails.price;

                hotelDetails.amenities.forEach(amenity => {
                    const li = document.createElement('li');
                    li.textContent = amenity;
                    amenitiesList.appendChild(li);
                });
            }
        } else {
            document.getElementById('hotel-name').textContent = 'Hotel Not Found';
            document.getElementById('hotel-price').textContent = 'N/A';
        }
    });
}

// Book Romm
function bookRoom() {
    // Get hotel details
    const hotelName = document.getElementById('hotel-name')?.textContent;
    const hotelPrice = document.getElementById('hotel-price')?.textContent;

    // Get booking details
    const checkInDate = document.getElementById('check-in')?.value;
    const checkOutDate = document.getElementById('check-out')?.value;
    const adults = document.getElementById('guests')?.value;

    // Validate hotel information
    if (!hotelName || hotelName === 'Hotel Not Found' || hotelPrice === 'N/A') {
        alert('Hotel information is missing. Please select a hotel first.');
        return;
    }

    // Validate booking form details
    if (!checkInDate || !checkOutDate || !adults || adults <= 0) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Confirm booking
    alert(`Your room at ${hotelName} has been successfully booked for ${hotelPrice}.`);
    window.location.href = 'confirmation.html';
}

// Update room availability
function updateRoomAvailability(isAvailable) {
    const availabilityElement = document.getElementById('room-availability');
    if (availabilityElement) {
        availabilityElement.textContent = isAvailable ? 'Available' : 'Not Available';
        availabilityElement.className = `availability ${isAvailable ? 'available' : 'not-available'}`;
    }
}

// Function to handle the search process
function searchHotels() {
    const checkInDate = document.getElementById('check-in')?.value;
    const checkOutDate = document.getElementById('check-out')?.value;
    const adults = document.getElementById('adults')?.value;
    const children = document.getElementById('children')?.value;

    // Validate inputs
    if (!checkInDate || !checkOutDate || !adults || adults <= 0) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Store the booking details in local storage
    localStorage.setItem('bookingDetails', JSON.stringify({
        checkInDate,
        checkOutDate,
        adults,
        children
    }));

    // Redirect to a search results or booking page
    window.location.href = 'results.html';
}

// Display booking details on the confirmation page
if (window.location.pathname.includes('confirmation.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
        const hotelDetails = JSON.parse(localStorage.getItem('selectedHotel'));

        const bookingDetailsElement = document.getElementById('booking-details');

        if (bookingDetails && hotelDetails && bookingDetailsElement) {
            bookingDetailsElement.innerHTML = `
                Hotel: ${hotelDetails.name} <br>
                Price: ${hotelDetails.price} <br>
                Check-in: ${bookingDetails.checkInDate} <br>
                Check-out: ${bookingDetails.checkOutDate} <br>
                Guests: ${bookingDetails.adults} Adult(s), ${bookingDetails.children || 0} Child(ren)
            `;
        } else if (bookingDetailsElement) {
            bookingDetailsElement.textContent = 'Booking details are missing.';
        }
    });
}

// Redirect to the home page after booking
function goHome() {
    window.location.href = 'index.html';
}
