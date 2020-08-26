const inputData = [5,8,2,1,15,2,3,5,9,11,10,4,3,14,1,7,10,3,2,13]

class Chart{
    constructor(){
        this.maxYAxisValue = 0;
        this.xAxis = {
            htmlElement: document.querySelector('.x-axis'),
            addLabel(name){
                const label = document.createElement('div');
                label.className = 'x-level';
                label.textContent = name;
                this.htmlElement.appendChild(label);
            },           
        };
        this.yAxis = {
            count: 0,
            htmlElementAxis: document.querySelector('.y-axis'),
            htmlElementPoints: document.querySelector('.y-level-points'),
            addYAxisPoints(value){
                for(let i = 1; i <= value; i++){
                    const label = document.createElement('div');
                    const point = document.createElement('div');
                    label.className = 'y-level';
                    point.className = 'y-point';
                    point.textContent = ++this.count;
                    this.htmlElementAxis.appendChild(label);
                    this.htmlElementPoints.appendChild(point);
                }
            }
        };
        this.columns = {
            htmlElement: document.querySelector('.columns'),            
            addColumn(value){  
                const getClassName = () => {
                    let className = '';
                    if(value > 10){
                        className = 'column high';
                    }else if(value <= 5){
                        className = 'column low';
                    }else{
                        className = 'column medium';
                    }
                    return className;
                }
                const column = document.createElement('div');
                column.className = getClassName();
                column.dataset.height = value;
                const columnItem = document.createElement('div');
                columnItem.className = 'column-item';
                columnItem.appendChild(column)
                this.htmlElement.appendChild(columnItem);
            },
        };
    }
    addData(value, name){
        this.setMaxYAxisValue(value)
        this.columns.addColumn(value);
        this.calcColumnsHeight();
        this.xAxis.addLabel(name);
    };
    setMaxYAxisValue(value){
        if(value > this.maxYAxisValue){
            this.yAxis.addYAxisPoints(value - this.maxYAxisValue);     // сколько точек добавить
            this.maxYAxisValue = value;
        }
    };
    calcColumnsHeight(){
        let columns = document.getElementsByClassName('column')
        for(let column of columns){
            const height = column.dataset.height * 100 / this.maxYAxisValue;
            column.style.height = height + '%';
        }
    };
};

let chart = new Chart();
inputData.forEach((item, index) => {
    chart.addData(item, index);
});


const controlChart = () => {
    const inputWidth = document.querySelector('.control__input[name="width"]');
    const inputHeight = document.querySelector('.control__input[name="height"]');
    const controlSize = document.querySelector('.control__size');
    const chartContainer = document.querySelector('.chart__container');

    const checkInput = value => {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? 0 : parsed;
    };

    controlSize.addEventListener('change', event => {
        if(event.target.classList.contains('control__input')){
            const newValue = checkInput(event.target.value);
            if(newValue){
                if(event.target === inputWidth){
                    chartContainer.style.width = newValue + 'px';
                    inputWidth.value = parseInt(chartContainer.style.width, 10);
                }else if(event.target === inputHeight){
                    chartContainer.style.height = newValue + 'px';
                    inputHeight.value = parseInt(chartContainer.style.height, 10);
                }
            }else{
                inputWidth.value = '';
                inputHeight.value = '';
            }
        }
    });
    controlSize.addEventListener('click', event =>{
        if(event.target.classList.contains('control__arrow')){
            if(event.target.closest('.arrow-less[data-use="width"]')){
                const cssValue = window.getComputedStyle(chartContainer).getPropertyValue("width");
                const countedValue = parseInt(cssValue, 10) - 1;
                chartContainer.style.width = countedValue + 'px';
                inputWidth.value = parseInt(chartContainer.style.width, 10);
            }
            else if(event.target.closest('.arrow-less[data-use="height"]')){
                const cssValue = window.getComputedStyle(chartContainer).getPropertyValue("height");
                const countedValue = parseInt(cssValue, 10) - 1;
                chartContainer.style.height = countedValue + 'px';
                inputHeight.value = parseInt(chartContainer.style.height, 10);
            }
            else if(event.target.closest('.arrow-more[data-use="width"]')){
                const cssValue = window.getComputedStyle(chartContainer).getPropertyValue("width");
                const countedValue = parseInt(cssValue, 10) + 1;
                chartContainer.style.width = countedValue + 'px';
                inputWidth.value = parseInt(chartContainer.style.width, 10);
            }
            else if(event.target.closest('.arrow-more[data-use="height"]')){
                const cssValue = window.getComputedStyle(chartContainer).getPropertyValue("height");
                const countedValue = parseInt(cssValue, 10) + 1;
                chartContainer.style.height = countedValue + 'px';
                inputHeight.value = parseInt(chartContainer.style.height, 10);
            }
        }
    })
}

controlChart();