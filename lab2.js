function Triangle(side, angle) {
	this.side = side == undefined ? 0.0 : side;
	this.angle = angle == undefined ? 0.0 : angle;
}

function TriangleView(side, angle) {
	Triangle.call(this, side, angle);

	this.createOperationView = function(rowIndex) {
		var view = document.createDocumentFragment();
		
		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.addEventListener("click", function() {
			data.deleteTriangle(rowIndex);
		});
		view.appendChild(deleteButton);

		return view;
	}

    this.createChangeSize = function(rowIndex) {
		var view = document.createDocumentFragment();
        
        var selectChSize = document.createElement("select");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var inputChSize = document.createElement("input");
        var btnCreate = document.createElement("button");
        
        option1.text = "Увеличить";
        option2.text = "Уменьшить";
        selectChSize.appendChild(option1);
        selectChSize.appendChild(option2);
        inputChSize.type = "number";
        inputChSize.id = "inpChSize";
        inputChSize.value = 1;
        inputChSize.min = 1;
        inputChSize.max = 99;
        btnCreate.addEventListener("click", function() {
            if(inputChSize.value >= 1 && inputChSize.value < 100)
            {
                if(selectChSize.selectedIndex == 0)
                    side = side * inputChSize.value;
                else
                    side = side / inputChSize.value;
                data.changeSize(side, angle, rowIndex);
            }
            else {
                alert("Введите число n >= 1");
            }
		});
        btnCreate.appendChild(document.createTextNode("Выполнить"));
        
		view.appendChild(selectChSize);
        view.appendChild(document.createTextNode(" в "));
		view.appendChild(inputChSize);
        view.appendChild(document.createTextNode(" раз "));
		view.appendChild(btnCreate);
        return view;
    }
    
	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode('№' + rowIndex));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(this.side));
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.angle + '°'));
		tr.appendChild(td3);

		var td4 = document.createElement('td');
        td4.appendChild(document.createTextNode(findSABH(side, angle)));
		tr.appendChild(td4);

		var td5 = document.createElement('td');
	    td5.appendChild(this.createChangeSize(rowIndex));
		tr.appendChild(td5);

		var td6 = document.createElement('td');
	    td6.appendChild(this.createOperationView(rowIndex));
		tr.appendChild(td6);

		return tr;
	}

}

function findSABH(side, angle) {
    var res = 0;
    var index = sSelect.selectedIndex;
    switch(index) {
        case 0:
            res = side;
            break;
        case 1:
            res = side;
            break;
        case 2:
            res = 2 * side * Math.cos(angle * Math.PI / 180);
            break;
        case 3:
            res = 180 - 2 * angle;
            break;
        case 4:
            res = angle;
            break;
        case 5:
            res = angle;
            break;
        case 6:
            res = side * Math.sin(angle * Math.PI / 180);
            break;
        case 7:
            res = side * Math.sin((180 - 2 * angle) * Math.PI / 180);
            break;
        case 8:
            res = side * Math.sin((180 - 2 * angle) * Math.PI / 180);
            break;
        case 9:
            res = side * Math.sin(angle * Math.PI / 180);
            break;
        case 10:
            res = (4 * side * Math.cos(angle * Math.PI / 180) * Math.cos(angle * Math.PI / 360)) / (1 + 2 * Math.cos(angle * Math.PI / 180));
            break;
        case 11:
            res = (4 * side * Math.cos(angle * Math.PI / 180) * Math.cos(angle * Math.PI / 360)) / (1 + 2 * Math.cos(angle * Math.PI / 180));
            break;
        default:
            break;
    }
    res = Math.round(res * 100)/100;
    if(index > 2 && index < 6)
        res = res + '°';
	return res;
}

function getRandom(x) {
	return (Math.random() * x).toFixed(1) + 1;
}

var data = {
	triangles : [
		new TriangleView(1, 30),
		new TriangleView(5, 45),
		new TriangleView(10, 60)
	],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles[i].createRow(i));
		}
	},

	add : function(side, angle) {
		this.triangles.push(new TriangleView(side, angle));
		this.refreshTable();
	},
    
    provEnter : function(e) {
        if(e.keyCode == 13)
            data.addNew();
    },
    
    select : function(){
        if(sSelect.selectedIndex < 3)
            document.getElementById("pSelect").textContent = "Сторона";
        else if(sSelect.selectedIndex < 6)
            document.getElementById("pSelect").textContent = "Угол";
        else if(sSelect.selectedIndex < 9)
            document.getElementById("pSelect").textContent = "Высота";
        else
            document.getElementById("pSelect").textContent = "Бисектриса";
        data.refreshTable();
    },
    
	addNew : function() {
        var side = document.getElementById("input1").value;
        var angle = document.getElementById("input2").value;
        if(!isNaN(side) && !isNaN(angle))
        {
            side = Math.floor(+side * 100)/100;
            angle = Math.floor(+angle * 100)/100;
            if(side <= 0)
            {
                side = 0.01;
                document.getElementById("input1").value = 0.01;
            }
            if(angle <= 0)
            {
                angle = 0.01;
                document.getElementById("input2").value = 0.01;
            }
            if(angle >= 90)
            {
                angle = 89.99;
            }
            document.getElementById("input1").value = side;
            document.getElementById("input2").value = angle;
            this.triangles.push(new TriangleView(side, angle));
            this.refreshTable();
        }
        else if(isNaN(side))
            alert("Введите число n > 0");
        else
            alert("Введите число 0° < n < 90°");
	},

	addRandom : function() {
		this.add(getRandom(100), getRandom(90));
	},

    changeSize : function(side, angle, index) {
		this.triangles.splice(index, 1, new TriangleView(side, angle));
		this.refreshTable();
    },
    
	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	}
}