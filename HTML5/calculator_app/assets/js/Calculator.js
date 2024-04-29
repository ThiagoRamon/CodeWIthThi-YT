class Calculator{
    constructor(){
        this.ENUM          = {EMPTY:'', DOT:'.',EQUALS:'=',ZERO:'0'};
        this.expression    = this.ENUM.EMPTY;
        this.currentValue  = this.ENUM.ZERO;
        this.previousValue = this.ENUM.EMPTY;
        this.operator      = this.ENUM.EMPTY;
        this.REGEX_PATTERN = {
                               OPERAND: /^-?[0-9.]+$/,
                               OPERATOR: /^[\=\-\+\/\*]$/,
                               CLEAN:/^C$/,
                               PLUS_MINUS:/^(\+\/\-)$/,
                               PERCENTAGE: /^%$/
                            }

    }
    userInputHandler(input = null){
        if(input == null) return;
        if(this.REGEX_PATTERN.OPERATOR.test(input)){
            this.operatorHandler(input);
            return;
        }
        if(this.REGEX_PATTERN.OPERAND.test(input)){
            this.operandHandler(input);
            return;
        }
        if(this.REGEX_PATTERN.PLUS_MINUS.test(input)){
            this.plusMinusHandler(input);
            return;
        }

        if(this.REGEX_PATTERN.PERCENTAGE.test(input)){
            this.percentageHandler(input);
            return;
        }

        if(this.REGEX_PATTERN.CLEAN.test(input)){
            this.cleanHandler();
            return;
        }

    }

    operatorHandler(operator){
        if(!this.REGEX_PATTERN.OPERAND.test(this.previousValue)&&
            operator == this.ENUM.EQUALS)return;
        if(this.REGEX_PATTERN.OPERAND.test(this.previousValue) &&
            this.REGEX_PATTERN.OPERAND.test(this.currentValue)){
                this.expression = this.previousValue + this.operator + this.currentValue;
                this.currentValue = eval(this.expression).toString();
                this.previousValue = this.ENUM.EMPTY;
            }
        this.operator = operator;

    }
    operandHandler(operand){
        if((this.REGEX_PATTERN.OPERATOR.test(this.operator)&&
            this.previousValue == this.ENUM.EMPTY ) && this.operator != this.ENUM.EMPTY){
            this.previousValue = this.currentValue;
            this.currentValue  = this.ENUM.ZERO;
        }

        if(this.currentValue == this.ENUM.ZERO && operand != this.ENUM.DOT ){
            this.currentValue = operand;
            return;
        }
        if(this.operator== this.ENUM.EQUALS &&
            this.previousValue == this.ENUM.EMPTY){
            this.currentValue = operand;
            this.operator = this.ENUM.ENUM;
            return;
        }
        if((this.currentValue.includes(this.ENUM.DOT)) &&
            operand == this.ENUM.DOT )return;
            console.log("-->"+this.currentValue)


        this.currentValue += operand;

    }
    plusMinusHandler(input){
        this.currentValue = (this.currentValue*-1).toString();
    }

    percentageHandler(input){
        if(this.previousValue != this.ENUM.EMPTY){
            this.currentValue = (this.previousValue * this.currentValue)/100;
            return;
        }
        this.currentValue = this.currentValue/100;
    }

    cleanHandler(){
        this.currentValue  = this.ENUM.ZERO;
        this.previousValue = this.ENUM.EMPTY;
        this.operator      = this.ENUM.EMPTY;
    }
}