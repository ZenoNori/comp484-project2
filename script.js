$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.battle-button').click(clickedBattleButton); // "call" function for new battle button
  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Gooby", weight:89, happiness:100, level:1}; // Added new variable 'level' to pet info
  
    function clickedTreatButton() {
      pet_info.happiness += 5; // Increase pet happiness
      pet_info.weight += 1; // Increase pet weight
      showPetMessage("Om nom nom nom");
      checkAndUpdatePetInfoInHtml();
      swapGengar("treat");
      gengarSounds.play.currentTime = 0;
      gengarSounds.treat.play();
    }
    
    function clickedPlayButton() {
      pet_info.happiness += 10; // Increase pet happiness
      pet_info.weight -= 1; // Decrease pet weight
      showPetMessage("Boo!");
      checkAndUpdatePetInfoInHtml();
      swapGengar("play");
      gengarSounds.play.currentTime = 0;
      gengarSounds.play.play();
    }
    
    function clickedExerciseButton() {
      pet_info.happiness -= 5; // Decrease pet happiness
      pet_info.weight -= 2; // Decrease pet weight
      showPetMessage("I'm \"Ghast\" out");
      checkAndUpdatePetInfoInHtml();
      swapGengar("exercise");
      gengarSounds.play.currentTime = 0;
      gengarSounds.exercise.play();
    }

    function clickedBattleButton() { // Added function for new battle button
      pet_info.level += 1; // Increase pet level
      showPetMessage("*Shadow Ball*");
      checkAndUpdatePetInfoInHtml();
      swapGengar("battle");
      gengarSounds.play.currentTime = 0;
      gengarSounds.battle.play();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();
      checkLevelBeforeUpdating();  // New function applied for level cap
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
    }

    function checkLevelBeforeUpdating() { // New function for conditional
      // Add conditional so if level is over a hundred.
      if (pet_info.level > 100) {
        pet_info.level = 100;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.level').text(pet_info['level']); // Allows for level behavior to be updated with current values in pet_info object as well
    }
  
    function showPetMessage(message) {
      const messageBox = $(".pet-message");
      messageBox.text(message);
      messageBox.css("opacity", 1);

      // Fade the message out after a few seconds
      setTimeout(() => {
        messageBox.css("opacity", 0);
      }, 1000);
    }

    // Below is code for the purpose of animating the image

    const gengarImgs = {
      idle: "images/gengar.jpg",
      treat: "images/gengar-treat.jpg",
      play: "images/gengar-play.jpg",
      exercise: "images/gengar-exercise.jpg",
      battle: "images/gengar-battle.jpg"
    };
    Object.values(gengarImgs).forEach(src => { const i = new Image(); i.src = src; });

    function swapGengar(state, showMs = 800, backToIdleMs = 1200) {
      const $img = $("#gengar");
      $img.stop(true, true).fadeOut(150, function () { // One of the unique methods used from jQuery was .fadeOut() and here it was used to stop any queued animations and fade out the current image. (Description: Hide the matched elements by fading them to transparent.)
        $img.attr("src", gengarImgs[state]).fadeIn(showMs); // The other unique method was .fadeIn() and here we used it to swap the image source safely once the other image was fully hidden through fading in the other image. (Description: Display the matched elements by fading them to opaque.)
      });

      // Return to idle after a moment
      clearTimeout(swapGengar._t);
      swapGengar._t = setTimeout(() => {
        $img.stop(true, true).fadeOut(250, function () { // Both unique methods are used once again to swap back to the idle image.
          $img.attr("src", gengarImgs.idle).fadeIn(250);
        });
      }, backToIdleMs);
    }

    //Below is code for adding sound effects

    // Preloading Gengar sound effects
    const gengarSounds = {
      treat: new Audio("audio/gengar_cry_1_pkm.mp3"),
      play: new Audio("audio/gengar_cry_1_pkm.mp3"),
      exercise: new Audio("audio/gengar_cry_2_pkm.mp3"),
      battle: new Audio("audio/gengar_cry_2_pkm.mp3")
    };

