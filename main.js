
// A image has width is 250px
const tabHeaders = document.querySelectorAll('.tab-item');
const tabBodys = document.querySelectorAll('.tab-body');
let swiperElement = document.querySelector('.swiper-slide');
let btnNext = document.querySelector('.btn-arrow-next');
let btnPrev = document.querySelector('.btn-arrow-prev');
// Set value active
let tabActive = 1;
let swiperItemActive = 1;
let swiperMarginLeft = 0;

// Set grid template colums
let swiperImages = swiperElement.querySelectorAll('.item');
swiperElement.style.gridTemplateColumns = `repeat(${swiperImages.length}, 1fr)`;

tabHeaders.forEach(tab => {
    tab.addEventListener('click', () => {
        tabActive = tab.dataset.tab;
        setActiveTab(tabActive);
    });
})

// Handle active tab
function setActiveTab(tabIndex) {
    tabHeaders.forEach(tab => {
        if(tab.dataset.tab == tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    })
    // Hide / show tab body
    tabBodys.forEach(tabBody => {
        if(tabBody.dataset.id == tabIndex) {
            tabBody.classList.add('show');
            swiperElement = tabBody.querySelector('.swiper-slide');
            btnNext = tabBody.querySelector('.btn-arrow-next');
            btnPrev = tabBody.querySelector('.btn-arrow-prev');
            // Set repeat
            swiperImages = swiperElement.querySelectorAll('.item');
            swiperElement.style.gridTemplateColumns = `repeat(${swiperImages.length}, 1fr)`;

            swiperMarginLeft = 0;
            swiperItemActive = 1;
            setMarginLeft(0, 0);

            setEventMouse();
        } else {
            tabBody.classList.remove('show');
        }
    })
}

// Handle active content text right
function setContentActive(index) {
    swiperItemActive = index;
    swiperMarginLeft = (index - 1) * -250;
    swiperElement.style.marginLeft = swiperMarginLeft + 'px';
    handleBtnNextPrev(swiperMarginLeft);
    handleShowContent(swiperItemActive);
    marginLeft = 0;
}

// Handle button next / prev
function handleBtnNextPrev(swiperMarginLeft) {
    // Next
    if(swiperMarginLeft < -swiperImages.length * 250 + 350) {
        btnNext.style.display = 'none';
    } else {
        btnNext.style.display = 'block';
    }
    // Prev
    if(swiperMarginLeft > -250) {
        btnPrev.style.display = 'none';
    } else {
        btnPrev.style.display = 'block';
    }
}

// Handle show / hide content text right
function handleShowContent(swiperItemActive) {
    const itemRights = document.querySelectorAll('.tab-body__right .item');
    itemRights.forEach(item => {
        if(item.dataset.id == swiperItemActive) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })
}

// Handle image block
function setMarginLeft(value, index) {
    swiperItemActive += index;
    swiperMarginLeft = (swiperItemActive - 1) * value;
    swiperElement.style.marginLeft = swiperMarginLeft + 'px';

    // Handle show / hide btn
    handleBtnNextPrev(swiperMarginLeft);
    // Show content right
    handleShowContent(swiperItemActive);

    marginLeft = 0;
}

// Handle event cursor slice image
let isMouseDown = false;
// Set value
let marginLeftStart = 0, marginLeft = 0;
let offsetXArray = [];

// Handle slide khi scrool swiper item
function handleSlice() {
    if(marginLeft != 0) {
        // Swiper item first
        if(marginLeft > 0) {
            setMarginLeft(0, 0);
            return;
        }
        // Swiper item last
        if(marginLeft < (swiperImages.length - 1) * -250) {
            swiperItemActive = 0;
            setMarginLeft(-250, swiperImages.length);
            return;
        }
        // Swiper orthers
        if(marginLeft < marginLeftStart - 125) {
            setMarginLeft(-250, 1);
        } else if(marginLeft > marginLeftStart + 125) {
            setMarginLeft(-250, -1);
        } else {
            setMarginLeft(-250, 0);
        }
    }
    marginLeft = 0;
}

function setEventMouse() {
    swiperElement.addEventListener('mousedown', (e) => {
        // Set value
        isMouseDown = true;
        offsetXArray = [];
        marginLeft = 0;
        marginLeftStart = (swiperItemActive - 1) * -250;
    })
    
    swiperElement.addEventListener('mouseleave', (e) => {
        isMouseDown = false;
        handleSlice();
        console.log(marginLeft);
    })
    
    swiperElement.addEventListener('mouseup', (e) => {
        isMouseDown = false;
        handleSlice();
    })
    
    swiperElement.addEventListener('mousemove', (e) => {
        if(!isMouseDown) return;
        e.preventDefault();
        // Get position pointer
        let offsetX = e.pageX - 50;
    
        // Check if offsetX already exists in the array
        if (!offsetXArray.includes(offsetX)) {
            offsetXArray.push(offsetX);
            let startValueArr = offsetXArray[0];
            let endValueArr = offsetXArray[offsetXArray.length - 1];
            // Giá trị cuối mảng - giá trị đầu mảng
            let widthX = endValueArr - startValueArr;
            // Tính giá trị margin left
            marginLeft = marginLeftStart + widthX;
            swiperElement.style.marginLeft = marginLeft + 'px';
        }
    })
}

setEventMouse();