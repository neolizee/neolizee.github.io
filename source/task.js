// Задание №1
const check = (int, string) => (int == string.substring(string.length - 10)) ? console.log(true) : console.log(false); check(9991234567, '+79991234567');

// Задание №2
const find = (array, number) => (array.includes(number)) ? console.log(true) : console.log(false); find([9001111111, 9002222222, 9003333333], 9003333333);

// Задание №3
let a = [
    {
        cardNum: "1234567890123456",
        cardStatus: "A",
        validTill: "10/20",
        product: "VISA"
    },
    {
        cardNum: "2234567890123456",
        cardStatus: "B",
        validTill: "15/20",
        product: "VISA GOLD"
    },
    {
        cardNum: "3234567890123456",
        cardStatus: "C",
        validTill: "20/25",
        product: "MC STANDART"
    },
    {
        cardNum: "4234567890123456",
        cardStatus: "C",
        validTill: "25/30",
        product: "MAESTRO"
    }
];

const result = a.filter(
    (show) =>
        (show.cardNum.substr(0, 4) == "1234" && show.cardStatus == "A") || (show.cardNum.substr(0, 4) == "4234" && show.cardStatus == "C")
);

console.table(result);
