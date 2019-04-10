class Control {
    constructor () {
        /**状态 */
        this.currentState = 0;
        /**食物的size */
        this.gridSize = 10;
        /**当前位置 x/y坐标*/
        this.currentOption = {
            x: 50,
            y: 50
        };
        /**食物的位置 */
        this.foodPoint = [];
        /**蛇的身体 */
        this.body = [];
        /**蛇的长度 初始设定为3*/
        this.length = 3;
        /**方向 1 2 3 4 上右下左 */
        this.direction = 1;
        /**分数 */
        this.score = 0;
        /**canvas绘制的上下文 通过参数传入*/
        this.ctx = null
        /**具体的节点 通过参数传入*/
        this.element = null;
        this.canvas = {
            'width': 840,
            "height": 470 
        }
    }

    /**
     * 吃一个 +1分
     * @param {*} element 
     */
    updateScore (element) {
        this.score = this.length - 3
        element.innerText = this.score;
    }

    /**
     * 碰撞检测
     */
    hasCrash (element) {
        return element[0] === this.foodPoint[0] && element[1] === this.foodPoint[1];
    }

    /**
     * setFood 放置食物
     * @param {*} ctx == canvas上下文
     */
    setFood (ctx) {
        this.foodPoint = [Math.floor(Math.random() * (this.canvas.width/this.gridSize)) * this.gridSize, Math.floor(Math.random() * (this.canvas.width/this.gridSize)) * this.gridSize];
        if (this.body.some(this.hasCrash)) {
            this.setFood();
        } else {
            ctx.fillStyle = 'rgb(10, 100, 0)';
            ctx.fillRect(this.foodPoint[0], this.foodPoint[1], this.gridSize, this.gridSize);
        }
    }

    /**
     * 是否吃到了自己
     * @param {*} element 
     */
    hasSuside (element) {
        return element[0] === this.currentOption.x && element[1] === this.currentOption.y;
    }
}