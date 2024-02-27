// ================ 상품 list가 12개 이상이면 more 버튼 보이게 하기 ================
const showMoreItems = () => {
    const listLi = document.querySelectorAll('#product-list li');

    // 숨겨진 리스트 중 다음 12개를 보여줌
    for (let i = 0; i < 12; i++) {
        const pulsLi = listLi[i + showItems];
        if (pulsLi) {
            pulsLi.style.display = 'block';
        } else {
            // 더 이상 보여줄 아이템이 없을 경우 버튼 숨김
            document.getElementById('more-btn').style.display = 'none';
            break;
        }
    }

    // 현재 보여지는 아이템 개수 업데이트
    showItems += 12;
};


// -------------- 더 보기 버튼에 이벤트 리스너 showMoreItems 추가하기!!!
document.getElementById('more-btn').addEventListener('click', showMoreItems);


// -------------- 초기에 보여지는 아이템의 개수
let showItems = 12;

// -------------- 초기에 12개 이상의 아이템이 있다면 더 보기 버튼 보이게 처리
if (document.querySelectorAll('#product-list li').length > showItems) {
    document.querySelector('.product-more').style.display = 'block';
}



// ================ 메인 상품목록 api 불러오기! ================
const mainList = async () => {
    const res = await fetch('http://localhost:8081/api/v1/products', {
        method: 'GET',
    });
    const data = await res.json();
    const realData = data.data;
    console.log(realData);
    console.log(realData[0]._id);

    // nav 부모 불러오기
    const navList = document.querySelector('.nav-left');

    // 이전에 추가된 내용 모두 지우기
    navList.innerHTML = '';

    // 카테고리 목록 정의
    const categories = ['ALL', 'CUSTOM', 'MODERN', 'LOVELY', 'DESKTERIOR', 'CLASIC', 'ACC'];

    for (let i = 0; i < categories.length; i++) {
        // 각 카테고리에 대한 링크를 저장할 변수 선언
        let categoryLink;

        // all 카테고리인 경우, 다른 페이지로 이동하지 않고 index.html로 이동
        if (categories[i] === 'ALL') {
            categoryLink = `<a href="/index.html">${categories[i]}</a>`;
        // all이 아닌 다른 카테고리인 경우, 그에 맞는 페이지로 이동
        } else {
            categoryLink = `<a href="/main/${categories[i].toLowerCase()}.html?category=${categories[i]}">${categories[i]}</a>`;
        }

        // 각 링크를 navList에 추가
        navList.insertAdjacentHTML('beforeend', categoryLink);
    }

    // ================ 상품 리스트 템플릿 ================
    const productList = document.querySelector('#product-list');
    console.log(`/main/detail.html?=${realData[0]._id}`);
    for (let i = 0; i < realData.length; i++) {
        const stockImage = realData[i].stock > 0 ? '' : '<img src="/public/img/sold.jpg" alt="">';
    
        const mainItem = `
            <li class="list-wrap">
                <div class="list-top">
                    <a href="/main/detail.html?=${realData[i]._id}">
                        <img src=${realData[i].main_image.url} alt="제품사진1" class="productImage">
                    </a>
                </div>
                <div class="list-bottom">
                    <!-- *** 상품명 title -->
                    <a href="/main/detail.html?=${realData[i]._id}" class="list-title">${realData[i].title}</a>
                    <!-- *** 카테고리명 들어감 -->
                    <p class="list-cg">${realData[i].category}</p>
                    <!-- *** 상품 가격 price -->
                    <p class="list-pay">${realData[i].price.toLocaleString()}원</p>
                    <!-- *** 수량이 0이 되었을때 사진 띄워짐 sold -->
                    <div class="list-status">
                        ${stockImage}
                    </div>
                </div>
            </li>
        `;
    
        productList.insertAdjacentHTML('beforeend', mainItem);
    }
}

mainList();
