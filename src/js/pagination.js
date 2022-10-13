const element = document.querySelector('.pagination ul');
let totalPages = 20;
let page = 1;

element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    liTag += `<li class="btn-skip prev" onclick="createPagination(totalPages, ${
      page - 1
    })"><span class="page-number-span span-svg">
    <svg class="svg-btn" version="1.1" width="16"  height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   <title>arrow-left</title>
    <path d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z" ></path>
  </svg>
  </span>
  </li>`;
  }

  if (page > 2) {
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span class="page-number-span">1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span class="page-number-span">...</span></li>`;
    }
  }

  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if (page == plength) {
      active = 'active';
    } else {
      active = '';
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span class="page-number-span">${plength}</span> </li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span class="page-number-span">...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span class="page-number-span">${totalPages}</span> </li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn-skip next" onclick="createPagination(totalPages, ${
      page + 1
    })"><span class="page-number-span span-svg"> 
    <svg class="svg-btn" version="1.1" width="16"  height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   <title>arrow-right</title>
    <path d="M16.172 9l-6.071-6.071 1.414-1.414 8.485 8.485-8.485 8.485-1.414-1.414 6.071-6.071h-16.172v-2z"></path>
  </svg>
 </span></li>`;
  }
  element.innerHTML = liTag;
  return liTag;
}
