let currentTab = 'MainButton';
let tabsArray = ['MainButton', 'C1Button', 'C2Button', 'C3Button'];

function setUpTabs(tabs){
    for(let i = 0; i < tabs.length; i++){
        document.getElementById(tabs[i]).addEventListener('click', () => {
            currentTab = tabs[i];
            updateTabs(tabsArray);
        })
    }
}
function updateTabs(tabs){
    for (let i = 0; i < tabs.length; i++){
        if (tabs[i] != currentTab){
            document.getElementById(tabs[i]).style.setProperty('opacity', '0.2');
        } else{
            document.getElementById(tabs[i]).style.setProperty('opacity', '1')
        }
    }
}

// Rad units are in vw
function magRad(initRad, maxRad){
    let currentRad = initRad;
    let radDiff = maxRad - initRad;
    console.log(window.getComputedStyle(document.getElementById('innerCircle')).getPropertyValue('outline-width'))
    let timerId = setInterval(() => {
        if (currentRad >= maxRad){
            currentRad = maxRad;
            clearInterval(timerId);
        } else {
            currentRad += radDiff/100
            document.getElementById('innerCircle').style.setProperty('outline-width', `${currentRad}vmin`);
            document.getElementById('magNumber').textContent = `${Math.round(currentRad)}00`;
            //console.log(`${currentRad} / ${maxRad}`);
        }
    }, 100);

}

function animationSetup(elem){
    elem.addEventListener('mouseover', () => {
        elem.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) spinLogo`;
        document.querySelector('.logoText').style.animation = '1s cubic-bezier(0.77, 0, 0.175, 1) slideText';
        document.querySelector('.logoText').style.transform = 'translateX(0px)';
    });
    elem.addEventListener('mouseout', () => {
        elem.style.animation = `1s cubic-bezier(0.77, 0, 0.175, 1) reverseLogo`;
        document.getElementById('logoText').style.animation = '1s cubic-bezier(0.77, 0, 0.175, 1) hideText';
        document.querySelector('.logoText').style.transform = 'translateX(-250px)';
    })
}

function setupSlider(slider, valueDisplay){
    console.log(slider.value);
    slider.addEventListener('mousedown', () => {
        turnYellow();
    });

    slider.addEventListener('mouseup', () => {
        turnWhite();
    });

    slider.addEventListener('input', () => {
        valueDisplay.value = `${slider.value}`;
    });

    valueDisplay.addEventListener('input', () => {
        turnYellow();

        if (valueDisplay.value.length > valueDisplay.maxLength){
            valueDisplay.value = valueDisplay.value.slice(0, valueDisplay.maxLength);
        }
    });

    valueDisplay.onkeydown = function(key){
        if(key.keyCode == 13){
            turnWhite();
            if(slider.value > 1000){
                slider.value = 1000;
            } else {
                slider.value = `${valueDisplay.value}`;
            }

            valueDisplay.blur();
            console.log(slider.value);
        }
    }

    function turnYellow(){
        valueDisplay.style.setProperty('color', `rgb(255,234, 0)`);
        valueDisplay.style.setProperty('font-size', `18px`);
    }

    function turnWhite(){
        valueDisplay.style.setProperty('color', `white`);
        valueDisplay.style.setProperty('font-size', `12px`);
    }
}

function setTemperature(tempElem, fillElem){
    let fillSize = 0;
    let timerId = setInterval(() => {
        if (fillSize >= 100){
            clearInterval(timerId);
        } else {
            fillSize++;
            tempElem.textContent = (`${fillSize}°C`);
            fillElem.style.setProperty('width', `${fillSize}%`);
        }
    }, 100);
}

function setPressure(pressureElem, fillElem){
    let fillSize = 0;
    let timerId = setInterval(() => {
        if (fillSize >= 300){
            clearInterval(timerId);
        } else {
            fillSize += 3;
            pressureElem.textContent = (`${fillSize}`);
            fillElem.style.setProperty('height', `${fillSize/3}%`);
        }
    }, 100);
}

updateTabs(tabsArray);
setUpTabs(tabsArray);
magRad(0, 10);
animationSetup(document.getElementById('logo'));

setupSlider(document.querySelector('.slider'), document.querySelector('.sliderNum'));

for(let i = 1; i <= 3; i++){
    setTemperature(document.getElementById(`meterTemp${i}`), document.getElementById(`meterFill${i}`));
}


for(let i = 1; i <= 3; i++){
    setPressure(document.getElementById(`pressureText${i}`), document.getElementById(`pressureMeterFill${i}`));
}

function testSO2Bar(){

        for(let i = 0; i <= 50; i++){
            setTimeout(() => {
                document.documentElement.style.setProperty('--c', `conic-gradient(from 270deg at 50% 100%, red 0%, blue ${i}%,  rgba(0, 0, 0, 0) ${i}%`);
            }, ((10 * i) + i*5));
           // console.log("yo");
        } 
}

function testSO2Bar2(){
    for(let i = 0; i <= 50; i++){
        setTimeout(() => {
            document.documentElement.style.setProperty('--c', `conic-gradient(from 270deg at 50% 100%, red 0%, blue ${50 - i}%,  rgba(0, 0, 0, 0) ${50 - i}%`);
        }, (10 * i) - i*5);
        //console.log("yo2");
    } 
}

testSO2Bar();
setTimeout(testSO2Bar2, 1500);

setInterval(() => {
    testSO2Bar();
    setTimeout(testSO2Bar2, 1500);
}, 5000)
