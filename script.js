// Function to create flower elements on the screen with random positions
        function createFlowers() {
            const celebrationDiv = document.getElementById('celebrateAnimation');

            for (let i = 0; i < 50; i++) {
                const flower = document.createElement('div');
                flower.classList.add('celebrate-flower');
                flower.style.left = `${Math.random() * 100}vw`;
                flower.style.top = `${Math.random() * 100}vh`;
                flower.style.animationDelay = `${Math.random() * 5}s`;
                flower.style.transform = `rotate(${Math.random() * 360}deg)`;
                celebrationDiv.appendChild(flower);
            }
        }

        // Function to show the celebration animation
        function startCelebration() {
            const celebrationDiv = document.getElementById('celebrateAnimation');
            celebrationDiv.style.display = 'block';
            createFlowers();
        }

        // Click event for heart to show the message and enable the button
        document.querySelector('.heart').addEventListener('click', function() {
            const message = document.querySelector('.message');
            const heart = document.querySelector('.heart');
            const isOpen = message.classList.contains('open');

            if (isOpen) {
                // Close the message
                message.classList.remove('open');
                heart.classList.remove('openHer');
                document.querySelector('.heart-section').style.backgroundColor = "#fce4ec";
                document.getElementById('scrollHint').style.display = 'block'; // Show the scroll hint
            } else {
                // Open the message and enable the button
                message.classList.add('open');
                heart.classList.add('openHer');
                document.querySelector('.heart-section').style.backgroundColor = "#f48fb1";
                document.getElementById('celebrateBtn').disabled = false; // Enable the button once the message is opened
                document.getElementById('scrollHint').style.display = 'none'; // Hide the scroll hint
            }
        });

        // Celebration button click event
        document.getElementById('celebrateBtn').addEventListener('click', startCelebration);