$(function() {
    var panel = [
       //如果上下左右出现a,a,b,b情况出现bug 但是 a,a.0,(a+a) 无bug
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]; //创建一个二维数组放置div里数据
    document.onkeydown = function(ev) {
        var oEvent = ev || event;
        switch (oEvent.keyCode) {
            case 37:
                leftMove();
                break;
            case 38:
                upMove();
                break;
            case 39:
                rightMove();
                break;
            case 40:
                downMove();
                break;
        }
    }
    //上下左右鍵
    var flag;
    creat();
    Changediv();
    var can;
    function leftMove() {
        if(isOver())
        {
            restart();
        }

        flag=false;
        for(var i=0;i<4;i++)
        {
            can=-1;
            left(i,1);
        }//for i
        if(flag)
        {
            creat();
        }
        Changediv();
    }//leftMove
    function upMove() {
        if(isOver())
        {
            restart();
        }
        flag=false;
        for(var j=0;j<4;j++)
        {
            can=-1;
            up(1,j);
        }//for j
        if(flag)
        {
            creat();
        }
        Changediv();
    }
    function rightMove() {
        if(isOver())
        {
            restart();
        }
        flag=false;
        for(var i=3;i>=0;i--)
        {
            can=-1;
            right(i,2);
        }//for i
        if(flag)
        {
            creat();
        }
        Changediv();
    }
    function downMove() {
        if(isOver())
        {
            restart();
        }
        flag=false;
        for(var j=3;j>=0;j--)
        {
            can=-1;
            down(2,j);
        }//for j
        if(flag)
        {
            creat();
        }
        Changediv();
    }
    /************************************/
    function up(i,j)
    {
        if(i==4)
            return ;
        if(panel[i][j]!=0)
        {
            var f=i-1;//判断当前是否可以移动,并且需要移动的距离
            while(f>=0 && panel[f][j]==0)
                f--;//判断数字前面是否可以移动,并且标记可移动到的位置
            if(f!=i-1)//判断当前可以移动,发生了while()
            {
                if(f==-1)//判断是否可以移动到最上面
                {
                    panel[f+1][j]=panel[i][j];
                    flag=true;//表示已经发生移动
                    Remove(i,j);
                }
                else//f!=-1,在合并的途中遇到阻拦
                {
                    if(panel[i][j]==panel[f][j])//可合并
                    {
                        if(can!=f)
                        {
                            can=f;
                            panel[f][j]+=panel[i][j];
                            flag=true;
                        }
                        else{
                            panel[f+1][j]=panel[i][j];
                            flag=true;
                        }
                    }
                    else//不可合并,将数字放在 f 之后
                    {
                        panel[f+1][j]=panel[i][j];
                        flag=true;
                    }
                }//f!=-1,分两种情况,可合并,不可合并
                Remove(i,j);
            }
            else{
                if(panel[i][j]==panel[i-1][j])//挨着,并且相等
                {
                    if(can!=f)
                    {
                        can=f;
                        panel[i-1][j]+=panel[i][j];
                        flag=true;
                    }
                    else{
                        panel[f+1][j]=panel[i][j];
                        flag=true;
                    }
                }
                else{
                    up(i+1,j);
                    return ;
                }
            }
            Remove(i,j);
        }
        up(i+1,j);
    }//up
    function down(i,j)
    {
        if(i<0)
            return ;
        if(panel[i][j]!=0)
        {
            var f=i+1;//判断当前是否可以移动,并且需要移动的距离
            while(f<=3 && panel[f][j]==0)
                f++;//判断数字前面是否可以移动,并且标记可移动到的位置
            if(f!=i+1)//判断当前可以移动,发生了while()
            {
                if(f==4)//判断是否可以移动到最下面
                {
                    panel[f-1][j]=panel[i][j];
                    flag=true;//表示已经发生移动
                    Remove(i,j);
                    console.log("if(f==4)");
                }
                else//f!=4,在合并的途中遇到阻拦
                {
                    if(panel[i][j]==panel[f][j])//可合并
                    {
                        if(can!=f)
                        {
                            can=f;
                            panel[f][j]+=panel[i][j];
                            flag=true;
                            console.log(" if(can!=f)");
                        }
                        else{
                            panel[f-1][j]=panel[i][j];
                            flag=true;
                            console.log("can==f)");
                        }
                    }
                    else//不可合并,将数字放在 f前
                    {
                        panel[f-1][j]=panel[i][j];
                        flag=true;
                        console.log("不可合并,将数字放在 f前");
                    }
                }//f!=4,分两种情况,可合并,不可合并
                Remove(i,j);
            }
            else{
                if(panel[i][j]==panel[i+1][j])//挨着,并且相等
                {
                    if(can!=f)//防止连加,这里可以加
                    {
                        can=f;
                        panel[i+1][j]+=panel[i][j];
                        flag=true;
                        console.log("挨着,并且相等 can!=f")
                    }
                    else{//防止连加,这里只是移动
                        panel[f-1][j]=panel[i][j];
                        flag=true;
                        console.log("挨着,并且相等 can==f")
                    }
                }
                else{
                    console.log("挨着,不相等")
                    down(i-1,j);
                    return ;
                }
            }
            Remove(i,j);
        }
        down(i-1,j);
    }//down
    function left(i,j){
            if(j==4)
                return ;
            if(panel[i][j]!=0)
            {
                var f=j-1;
                while(f>=0 && panel[i][f]==0)
                    f--;//判断数字前面是否可以移动,并且标记可移动到的位置
                if(f!=j-1)//判断当前可以移动,发生了while()
                {
                    if(f==-1)
                    {
                        panel[i][f+1]=panel[i][j];
                        flag=true;
                        Remove(i,j);
                    }
                    else//f!=-1,分两种情况,可合并,不可合并
                    {
                       if(panel[i][j]==panel[i][f])//可合并
                       {
                           if(can!=f)
                           {
                               can=f;
                               panel[i][f]+=panel[i][j];
                               flag=true;
                           }
                           else{
                               panel[i][f+1]=panel[i][j];
                               flag=true;
                           }
                       }
                       else//不可合并,将数字放在 f 之后
                       {
                           panel[i][f+1]=panel[i][j];
                           flag=true;
                       }
                    }//f!=-1,分两种情况,可合并,不可合并
                    Remove(i,j);
                }
            else {
                    if (panel[i][j] == panel[i][j - 1])//挨着,并且相等
                    {
                        if(can!=f)
                        {
                            can=f;
                            panel[i][j - 1] += panel[i][j];
                            flag = true;
                        }
                        else{
                            panel[i][f+1]=panel[i][j];
                            flag=true;
                        }
                    }
                    else {
                        left(i,j+1);
                        return ;
                    }
                }
                Remove(i,j);
            }
            left(i,j+1);
    }//left()
    function right(i,j){
        if(j<0)
            return ;
        if(panel[i][j]!=0)
        {
            var f=j+1;
            while(f<=3 && panel[i][f]==0)
                f++;//判断数字前面是否可以移动,并且标记可移动到的位置
            if(f!=j+1)//判断当前可以移动,发生了while()
            {
                if(f==4)
                {
                    panel[i][f-1]=panel[i][j];
                    flag=true;
                    Remove(i,j);
                }
                else//f!=-1,分两种情况,可合并,不可合并
                {
                    if(panel[i][j]==panel[i][f])//可合并
                    {
                        if(can!=f)
                        {
                            can=f;
                            panel[i][f]+=panel[i][j];
                            flag=true;
                        }
                        else{
                            panel[i][f-1]=panel[i][j];
                            flag=true;
                        }
                    }
                    else//不可合并,将数字放在 f 之后
                    {
                        panel[i][f-1]=panel[i][j];
                        flag=true;
                    }
                }//f!=-1,分两种情况,可合并,不可合并
                Remove(i,j);
            }
            else {
                if (panel[i][j] == panel[i][j + 1])//挨着,并且相等
                {
                    if(can!=f)
                    {
                        can=f;
                        panel[i][j+1] += panel[i][j];
                        flag = true;
                    }
                    else{
                        panel[i][f+1]=panel[i][j];
                        flag=true;
                    }
                }
                else{
                    right(i,j-1);
                    return ;
                }
            }
            Remove(i,j);
        }
        right(i,j-1);
    }//right

    /************************************/
    function creat() {
        var num;
        var x;
        var y;
        num = parseInt((Math.random() * 2) + 1); //随机生成1,2
        x = parseInt((Math.random() * 4)); //随机生成x坐标
        y = parseInt((Math.random() * 4)); //随机生成y坐标
        while (panel[x][y] != 0) {
            x = parseInt((Math.random() * 4)); //随机生成x坐标
            y = parseInt((Math.random() * 4)); //随机生成y坐标
        }
        panel[x][y] = num*2;
    }
    //判断数组是否满
    function isFull() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (panel[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }
    //判断游戏是否结束返回boolean
    function isOver()
    {
        if (!isFull()){
            return false;
        }
        return dfs(0,0);
    }
    //判断结束算法
    function dfs(x,y)
    {
        if(x>=3 && y>=3)
            return false;
        if(x<3&& panel[x][y]==panel[x+1][y])
            return false;
        if(y<3 && panel[x][y]==panel[x][y+1])
            return false;
        return dfs(x+1,y)&&dfs(x,y+1);
    }
    //重启函数
    function restart()
    {
        alert("游戏结束")//弹出游戏结束,和最高分
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {//清空数组 改变div样式和数字
                var cell=$(".cell").eq(i*4+j);
                switch (panel[i][j]) {
                    case 2:
                        cell.removeClass("n2")
                        break;
                    case 4:
                        cell.removeClass("n4")
                        break;
                    case 8:
                        cell.removeClass("n8")
                        break;
                    case 16:
                        cell.removeClass("n16")
                        break;
                    case 32:
                        cell.removeClass("n32")
                        break;
                    case 64:
                        cell.removeClass("n64")
                        break;
                    case 128:
                        cell.removeClass("n128")
                        break;
                    case 256:
                        cell.removeClass("n256")
                        break;
                    case 512:
                        cell.removeClass("n512")
                        break;
                    case 1024:
                        cell.removeClass("n1024")
                        break;
                    case 2048:
                        cell.removeClass("n2048")
                        break;
                    case 4096:
                        cell.removeClass("n4096")
                        break;
                    case 8192:
                        cell.removeClass("n8192")
                        break;
                }
                /*****这里有问题,panel里面不要不应该变成空******/
                panel[i][j]="";
                cell.html(panel[i][j]);
            }
        }
    }//restart
    function Changediv() {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
            if (panel[i][j] != 0) {
                var cell=$(".cell").eq(i*4+j);
                cell.html(panel[i][j]);
                }
            }//for i
    } //将数组中的数字放在div,并且给对应数字加上不同类
    //去除样式
    function Remove(i,j)
    {
        var cell=$(".cell").eq(i*4+j);
        panel[i][j]=0;
        cell.html("");
    }
});