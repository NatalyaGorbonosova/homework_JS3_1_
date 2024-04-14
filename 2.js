"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

/* const cooks = [
  {name: "Олег", type: "Пицца"},
  {name: "Андрей", type: "Суши"},
  {name: "Анна", type: "Десерт"}
];
const dishes = [
  {name: "Маргарита", type: "Пицца"},
  {name: "Пепперони", type: "Пицца"},
  {name: "Три сыра", type: "Пицца"},
  {name: "Филадельфия", type: "Суши"},
  {name: "Калифорния", type: "Суши"},
  {name: "Чизмаки", type: "Суши"},
  {name: "Сеякемаки", type: "Суши"},
  {name: "Тирамису", type: "Десерт"},
  {name: "Чизкейк", type: "Десерт"}
] */

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  cooks = [
    {name: "Олег", type: "Пицца"},
    {name: "Андрей", type: "Суши"},
    {name: "Анна", type: "Десерт"}
  ];
  dishes = [
    {name: "Маргарита", type: "Пицца"},
    {name: "Пепперони", type: "Пицца"},
    {name: "Три сыра", type: "Пицца"},
    {name: "Филадельфия", type: "Суши"},
    {name: "Калифорния", type: "Суши"},
    {name: "Чизмаки", type: "Суши"},
    {name: "Сеякемаки", type: "Суши"},
    {name: "Тирамису", type: "Десерт"},
    {name: "Чизкейк", type: "Десерт"}
  ];

  orders = new Map();
  nameDishes = this.dishes.map((dish) => {return dish.name});

  findCookByType(type) {
    for (const cook of this.cooks) {
      if (cook.type === type) {
        return cook;
      } 
      
    }
    return null;
  }
  
  newOrder(client, ...oderedDish){
    
    const arrOder = [...oderedDish];
    
   
    for (const dish of arrOder) {
      if (!this.nameDishes.includes(dish.name)) {
        return console.log(`${dish.type} ${dish.name} - такого блюда не существует.`);
      }
    }
    console.log(`Клиент ${client.firstname} заказал:`);
    
    if (this.orders.has(client)) {
      
      const dishNameInOrder = this.orders.get(client).map((dish) => {return dish.name})
      for (const dish of arrOder) {
        if (dishNameInOrder.includes(dish.name)) {
          this.orders.get(client).find((dishOrder) => {return dishOrder.name === dish.name}).quantity += dish.quantity;
        } else {
          this.orders.get(client).push(dish);
        }
      }
    } else {
      this.orders.set(client, arrOder);
      
    }
    for (const dish of this.orders.get(client)) {
      const cook = this.findCookByType(dish.type);
      if (cook != null) {
        console.log(`${dish.type} ${dish.name} - ${dish.quantity}; готовит повар ${cook.name}`);
      }
      
    }
    
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.

manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.