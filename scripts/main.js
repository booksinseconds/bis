
function getBookImage(imageSrc){
  let bookImage = document.createElement("img");
  bookImage.src = imageSrc;
  bookImage.height = "200";
  bookImage.width = "200";
  return bookImage;
}

function getBookImageClickable(bookImage,bookDataIndex){
  let bookImageClickableLink = document.createElement("a");
  bookImageClickableLink.appendChild(bookImage);
  bookImageClickableLink.href="javascript:showDetails("+ bookDataIndex + ")";
  bookImageClickableLink.title = "View Details";
  return bookImageClickableLink;
}

function getBookTitle(title){
  let boldTag = document.createElement("b");
  boldTag.appendChild(document.createTextNode(title));
  return boldTag;
}

function getBookAuthor(author){
  return document.createTextNode("by " + author);
}

function getBookDetailLink(bookDataIndex){
  let detailLink = document.createElement("a");
  let linkText = document.createTextNode("View Details");
  detailLink.appendChild(linkText);
  detailLink.href="javascript:showDetails("+ bookDataIndex + ")";
  detailLink.title = "View Details";
  return detailLink;
}

function nextAptCell(aTable){
  return aTable.insertRow(-1).insertCell(0);
}

function getBookSummaryTable(bookDataIndex){
  let imageSrc = arrBooksImages[bookDataIndex].bookFrontImageSrc;
  let title = arrBooksDetails[bookDataIndex].bookTitle;
  let author = arrBooksDetails[bookDataIndex].bookAuthor;

  let bookSummaryTable = document.createElement("table");

  let bookImageCell = nextAptCell(bookSummaryTable);
  let bookTitleCell = nextAptCell(bookSummaryTable);
  let bookAuthorCell = nextAptCell(bookSummaryTable);
  let bookDetailLinkCell = nextAptCell(bookSummaryTable);

  let bookImage = getBookImage(imageSrc);
  let bookImageClickable = getBookImageClickable(bookImage,bookDataIndex);
  let bookTitle = getBookTitle(title);
  let bookAuthor = getBookAuthor(author);
  let bookDetailLink = getBookDetailLink(bookDataIndex);

  //bookImageCell.appendChild(bookImage);
  bookImageCell.appendChild(bookImageClickable);
  bookTitleCell.appendChild(bookTitle);
  bookAuthorCell.appendChild(bookAuthor);
  bookDetailLinkCell.appendChild(bookDetailLink);

  return bookSummaryTable;
}

function getFillerCell(aRow){
  let newCell = aRow.insertCell(-1);
  newCell.width = 100;
  return newCell;
}

function getFillerRow(booksTable,booksPerRowLimit){
  const fillRowCellHeight = 50;

  let fillerRow = booksTable.insertRow(-1);
  let newCell = fillerRow.insertCell(-1);
  newCell.colSpan = 2 * booksPerRowLimit;
  newCell.height = fillRowCellHeight;
  return fillerRow;
}


function booksLoader(){
  const maxRecords = arrBooksDetails.length;
  const booksPerRowLimit = 4;

  let booksPerRow = 0;

  let booksTable = document.getElementById("booksTable");
  let newRow = booksTable.insertRow(-1);

  for(let i=0;i<maxRecords;i++){

    booksPerRow = booksPerRow + 1;
    if (booksPerRow > booksPerRowLimit){
      booksPerRow = 1;
      let fillerRow = getFillerRow(booksTable,booksPerRowLimit);
      newRow = booksTable.insertRow(-1);
    }

    let newCell = newRow.insertCell(-1);
    let fillerCell = getFillerCell(newRow);

    let newCellContent = getBookSummaryTable(i);

    newCell.appendChild(newCellContent);
  }

}

function showDetails(bookDataIndex){
  let bookDetailsDialog = document.getElementById("bookDetailsDialog");

  let frontImage = document.getElementById("imgFront");
  let walkImage = document.getElementById("imgWalk");
  let backImage = document.getElementById("imgBack");

  frontImage.src = arrBooksImages[bookDataIndex].bookFrontImageSrc;
  walkImage.src = arrBooksImages[bookDataIndex].bookWalkImageSrc;
  backImage.src = arrBooksImages[bookDataIndex].bookBackImageSrc;

  frontImage.onclick = function(){showBookImageBig(frontImage.src);};
  walkImage.onclick = function(){showBookImageBig(walkImage.src);};
  backImage.onclick = function(){showBookImageBig(backImage.src);};

  showBookImageBig(frontImage.src);
  showBookBrief(bookDataIndex);

  bookDetailsDialog.showModal();
}

function closeDetails(){
  let bookDetailsDialog = document.getElementById("bookDetailsDialog");
  bookDetailsDialog.close();
}

function showBookImageBig(aImageSrc){
  let actualSizedImage = document.getElementById("imgActualSized");
  actualSizedImage.src = aImageSrc;
}

function showBookBrief(bookDataIndex){
  let bookBriefContainer = document.getElementById("bookBrief");

  let spanBookTitle = document.getElementById("spanBookTitle");
  let spanBookAuthor = document.getElementById("spanBookAuthor");
  let spanBookPrice = document.getElementById("spanBookPrice");
  let spanBookCondition = document.getElementById("spanBookCondition");

  spanBookTitle.textContent = arrBooksDetails[bookDataIndex].bookTitle;
  spanBookAuthor.textContent = arrBooksDetails[bookDataIndex].bookAuthor;
  spanBookPrice.textContent =  "Rs." + arrBooksDetails[bookDataIndex].bookPrice + "/-";
  spanBookCondition.textContent = arrBooksDetails[bookDataIndex].bookNotes;

  //bookBriefContainer.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dolor nisl, fermentum id volutpat non, lacinia sit amet leo. Nam. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
}
