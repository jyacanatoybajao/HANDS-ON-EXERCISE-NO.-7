const btnInsertUpdate =
    document.getElementById("btnInsertUpdate");

const btnClearItems =
    document.getElementById("btnClearItems");

const btnClear =
    document.getElementById("btnClear");

const tblRecords =
    document.getElementById("tblRecords");

const sortField =
    document.getElementById("sortField");

const sortOrder =
    document.getElementById("sortOrder");

const btnSave =
    document.getElementById("btnSave");

let arrRecords =
    JSON.parse(localStorage.getItem("records")) || [];


const tblTHsLabels = [
    "First Name",
    "Middle Name",
    "Last Name",
    "Age",
    "Action"
];

btnInsertUpdate.addEventListener("click", () => {

    const inputTxt =
        document.getElementsByTagName("input");


    if (btnInsertUpdate.value == "insert") {
        for (const txt of inputTxt) {

            if (txt.value.trim() == "") {

                alert(
                    "Please complete all the text inputs!"
                );

                return;
            }
        }

        let infoRecord = {

            fname: inputTxt[0].value,

            mname: inputTxt[1].value,

            lname: inputTxt[2].value,

            age: parseInt(inputTxt[3].value)

        };

        arrRecords.push(infoRecord);

        for (const txt of inputTxt) {
            txt.value = "";
        }

        iterateRecords();

    }

    else {
        for (const txt of inputTxt) {

            if (txt.value.trim() == "") {

                alert(
                    "Please complete all the text inputs!"
                );

                return;
            }
        }


        const index =
            parseInt(btnInsertUpdate.value);


        arrRecords[index].fname =
            inputTxt[0].value;

        arrRecords[index].mname =
            inputTxt[1].value;

        arrRecords[index].lname =
            inputTxt[2].value;

        arrRecords[index].age =
            parseInt(inputTxt[3].value);


        iterateRecords();

        for (const txt of inputTxt) {
            txt.value = "";
        }

        btnInsertUpdate.innerHTML =
            "Insert";

        btnInsertUpdate.value =
            "insert";

    }

});

btnClear.addEventListener("click", () => {

    const inputTxt =
        document.getElementsByTagName("input");


    for (const txt of inputTxt) {
        txt.value = "";
    }


    btnInsertUpdate.innerHTML =
        "Insert";

    btnInsertUpdate.value =
        "insert";

});

btnClearItems.addEventListener("click", () => {

    arrRecords = [];


    localStorage.removeItem("records");


    while (tblRecords.hasChildNodes()) {

        tblRecords.removeChild(
            tblRecords.firstChild
        );

    }


    document.getElementById("status")
        .style.display = "inline";

    document.getElementById("status")
        .innerHTML = "No Records...";


    btnInsertUpdate.innerHTML =
        "Insert";

    btnInsertUpdate.value =
        "insert";

});

function iterateRecords() {

    while (tblRecords.hasChildNodes()) {

        tblRecords.removeChild(
            tblRecords.firstChild
        );

    }

    if (arrRecords.length != 0) {

        document.getElementById("status")
            .style.display = "none";


        const tblHeaderRow =
            document.createElement("tr");

        const tblHeader =
            document.createElement("thead");


        tblHeaderRow.style.borderTop =
            "1px solid black";

        tblHeaderRow.style.borderBottom =
            "1px solid black";


        for (let i = 0; i < 5; i++) {

            const tblTHs =
                document.createElement("th");


            tblTHs.style.padding =
                "5px";


            if (i != 4) {

                tblTHs.style.borderRight =
                    "1px solid black";

            }


            tblTHs.innerHTML =
                tblTHsLabels[i];


            tblHeaderRow.appendChild(
                tblTHs
            );

        }


        tblHeader.appendChild(
            tblHeaderRow
        );

        tblRecords.appendChild(
            tblHeader
        );


        const tblBody =
            document.createElement("tbody");


        arrRecords.forEach((rec, i) => {

            const tblRow =
                document.createElement("tr");


            const tbdataFname =
                document.createElement("td");

            const tbdataMname =
                document.createElement("td");

            const tbdataLname =
                document.createElement("td");

            const tbdataAge =
                document.createElement("td");

            const tbdataActionBtn =
                document.createElement("td");


            const btnDelete =
                document.createElement("button");

            const btnUpdate =
                document.createElement("button");


            tbdataFname.style.borderRight =
                "1px solid black";

            tbdataFname.style.padding =
                "10px";


            tbdataMname.style.borderRight =
                "1px solid black";

            tbdataMname.style.padding =
                "10px";


            tbdataLname.style.borderRight =
                "1px solid black";

            tbdataLname.style.padding =
                "10px";


            tbdataAge.style.borderRight =
                "1px solid black";

            tbdataAge.style.padding =
                "10px";


            tbdataActionBtn.style.padding =
                "10px";


            tblRow.style.borderBottom =
                "1px solid black";


            tbdataFname.innerHTML =
                rec.fname;

            tbdataMname.innerHTML =
                rec.mname;

            tbdataLname.innerHTML =
                rec.lname;

            tbdataAge.innerHTML =
                rec.age;



            btnDelete.innerHTML =
                "Delete";

            btnDelete.setAttribute(
                "onclick",
                `deleteData(${i})`
            );

            btnDelete.style.marginRight =
                "5px";



            btnUpdate.innerHTML =
                "Edit";

            btnUpdate.setAttribute(
                "value",
                "update"
            );

            btnUpdate.setAttribute(
                "onclick",
                `updateData(${i})`
            );

            btnUpdate.style.marginRight =
                "5px";


            tbdataActionBtn.appendChild(
                btnDelete
            );

            tbdataActionBtn.appendChild(
                btnUpdate
            );

            tblRow.appendChild(
                tbdataFname
            );

            tblRow.appendChild(
                tbdataMname
            );

            tblRow.appendChild(
                tbdataLname
            );

            tblRow.appendChild(
                tbdataAge
            );

            tblRow.appendChild(
                tbdataActionBtn
            );


            tblBody.appendChild(
                tblRow
            );

        });


        tblRecords.appendChild(
            tblBody
        );

    }

    else {

        document.getElementById("status")
            .style.display = "inline";

        document.getElementById("status")
            .innerHTML = "No Records...";

    }

}

function deleteData(i) {

    arrRecords.splice(i, 1);

    iterateRecords();

}

function updateData(i) {

    const inputTxt =
        document.getElementsByTagName("input");


    inputTxt[0].value =
        arrRecords[i].fname;

    inputTxt[1].value =
        arrRecords[i].mname;

    inputTxt[2].value =
        arrRecords[i].lname;

    inputTxt[3].value =
        arrRecords[i].age;


    btnInsertUpdate.innerHTML =
        "Update";

    btnInsertUpdate.value =
        `${i}`;

}

sortField.addEventListener(
    "change",
    sortRecords
);

sortOrder.addEventListener(
    "change",
    sortRecords
);


function sortRecords() {

    const field =
        sortField.value;

    const order =
        sortOrder.value;


    if (field == "" || order == "") {
        return;
    }

    arrRecords.sort((a, b) => {

        let valueA =
            a[field];

        let valueB =
            b[field];

        if (field == "age") {

            valueA =
                Number(valueA);

            valueB =
                Number(valueB);

        }

        else {

            valueA =
                valueA.toLowerCase();

            valueB =
                valueB.toLowerCase();

        }

        if (order == "az") {

            if (valueA < valueB) {
                return -1;
            }

            if (valueA > valueB) {
                return 1;
            }

        }

        else if (order == "za") {

            if (valueA < valueB) {
                return 1;
            }

            if (valueA > valueB) {
                return -1;
            }

        }


        return 0;

    });


    iterateRecords();

}


btnSave.addEventListener("click", () => {

    localStorage.setItem(
        "records",
        JSON.stringify(arrRecords)
    );


    alert(
        "The program can sort also data"
    );

});


iterateRecords();
