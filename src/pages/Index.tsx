
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, BookOpen, Star, PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Данные для категорий наук
const scienceCategories = [
  { id: 1, name: "Физика" },
  { id: 2, name: "Математика" },
  { id: 3, name: "Биология" },
  { id: 4, name: "Химия" },
  { id: 5, name: "Информатика" },
  { id: 6, name: "Астрономия" },
  { id: 7, name: "Психология" },
  { id: 8, name: "История" },
  { id: 9, name: "Философия" },
];

// Данные для лекций
const lectures = [
  {
    id: 1,
    title: "Введение в квантовую физику",
    category: "Физика",
    duration: 45,
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1000",
  },
  {
    id: 2,
    title: "Основы молекулярной биологии",
    category: "Биология",
    duration: 60,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1000",
  },
  {
    id: 3,
    title: "Алгоритмы и структуры данных",
    category: "Информатика",
    duration: 90,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000",
  },
  {
    id: 4,
    title: "Высшая математика для начинающих",
    category: "Математика",
    duration: 75,
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1000",
  },
  {
    id: 5,
    title: "Философия науки",
    category: "Философия",
    duration: 60,
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1000",
  },
  {
    id: 6,
    title: "Органическая химия",
    category: "Химия", 
    duration: 50,
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1000",
  },
];

// Данные для планов подписки
const subscriptionPlans = [
  {
    id: 1,
    title: "Базовый",
    price: 590,
    period: "месяц",
    features: [
      "Доступ к 50+ базовым лекциям",
      "Конспекты лекций",
      "Мобильный доступ"
    ],
    isPopular: false,
    color: "bg-gradient-to-br from-blue-50 to-blue-100"
  },
  {
    id: 2,
    title: "Стандарт",
    price: 990,
    period: "месяц",
    features: [
      "Доступ к 150+ лекциям",
      "Конспекты и материалы",
      "Тесты после каждой лекции",
      "Сертификаты по окончании курсов"
    ],
    isPopular: true,
    color: "bg-gradient-to-br from-purple-50 to-purple-100"
  },
  {
    id: 3,
    title: "Премиум",
    price: 1990,
    period: "месяц",
    features: [
      "Доступ ко всем 300+ лекциям",
      "Все материалы курсов",
      "Тесты и проверочные работы",
      "Персональный наставник",
      "Индивидуальные консультации"
    ],
    isPopular: false,
    color: "bg-gradient-to-br from-pink-50 to-pink-100"
  }
];

// Данные для FAQ
const faqItems = [
  {
    question: "Как получить доступ к лекциям?",
    answer: "После оформления подписки вы получите доступ к личному кабинету, в котором будут доступны все материалы согласно выбранному плану."
  },
  {
    question: "Можно ли скачивать материалы лекций?",
    answer: "Да, все материалы лекций доступны для скачивания и использования в офлайн-режиме в рамках выбранного плана подписки."
  },
  {
    question: "Как отменить подписку?",
    answer: "Вы можете отменить подписку в любой момент в вашем личном кабинете. Доступ к материалам сохранится до конца оплаченного периода."
  },
  {
    question: "Выдаете ли вы сертификаты?",
    answer: "Да, выдаем сертификаты по окончании курсов для подписок Стандарт и Премиум. Сертификаты доступны в электронном виде."
  },
  {
    question: "Есть ли пробный период?",
    answer: "Да, мы предоставляем 7-дневный пробный период для всех новых пользователей, чтобы вы могли оценить качество наших материалов."
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedLecture, setExpandedLecture] = useState<number | null>(null);

  // Эффект для автоматической прокрутки категорий
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    
    if (isScrolling && scrollRef.current) {
      scrollInterval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
          
          // Если дошли до конца, начинаем сначала
          if (scrollRef.current.scrollLeft >= 
              scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 30);
    }
    
    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isScrolling]);

  const handleCategoryClick = (id: number) => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
      setIsScrolling(true);
    } else {
      setSelectedCategory(id);
      setIsScrolling(false);
    }
  };

  const handleLectureClick = (id: number) => {
    setExpandedLecture(expandedLecture === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6 font-montserrat"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Онлайн лекции для вашего развития
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-rubik"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Погрузитесь в мир знаний с комфортом. Изучайте интересующие вас темы в удобное время и в своем темпе.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-6 rounded-full text-lg font-medium hover:shadow-lg transition-all">
              Начать обучение
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-70">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 font-montserrat text-gray-800">Выберите интересующую науку</h2>
          
          <div 
            ref={scrollRef}
            className="flex overflow-hidden space-x-4 py-6 px-2 mb-8"
          >
            {scienceCategories.map((category) => (
              <motion.div
                key={category.id}
                className={`shrink-0 ${selectedCategory === category.id ? 'ring-2 ring-purple-500' : ''}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <Badge 
                  className={`px-6 py-3 text-base cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gradient-to-r from-purple-100 to-blue-100 text-gray-700'
                  }`}
                  variant="outline"
                >
                  {category.name}
                </Badge>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 italic mb-8">
            {isScrolling ? "Нажмите на категорию, чтобы остановить" : "Нажмите еще раз, чтобы продолжить"}
          </p>
        </div>
      </section>

      {/* Lectures Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-montserrat text-gray-800">Популярные лекции</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lectures.map((lecture) => (
              <motion.div
                key={lecture.id}
                className={`h-full`}
                whileHover={{ scale: 1.03 }}
                animate={{ 
                  scale: expandedLecture === lecture.id ? 1.05 : 1,
                  zIndex: expandedLecture === lecture.id ? 10 : 1
                }}
                onClick={() => handleLectureClick(lecture.id)}
              >
                <Card className="overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={lecture.image} 
                      alt={lecture.title} 
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                      <Badge className="bg-white text-gray-800">
                        {lecture.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">{lecture.title}</h3>
                    <div className="flex items-center mt-auto text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{lecture.duration} минут</span>
                    </div>
                    
                    {expandedLecture === lecture.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <p className="text-gray-600 mb-3">Подробное изучение темы с практическими примерами и разбором сложных моментов.</p>
                        <Button variant="outline" className="w-full">Начать просмотр</Button>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full px-8">
              Показать больше лекций
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-70">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 font-montserrat text-gray-800">Выберите подходящий план</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Получите доступ к образовательному контенту на условиях, которые подходят именно вам
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ translateY: -10 }}
                className="relative"
              >
                <Card className={`h-full overflow-hidden border-2 ${
                  plan.isPopular ? 'border-purple-400' : 'border-transparent'
                } ${plan.color}`}>
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0">
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white m-2">
                        Популярный выбор
                      </Badge>
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price} ₽</span>
                      <span className="text-gray-500">/{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        plan.isPopular 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg' 
                          : 'bg-white'
                      }`}
                      variant={plan.isPopular ? 'default' : 'outline'}
                    >
                      Выбрать план
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-montserrat text-gray-800">Часто задаваемые вопросы</h2>
          
          <Accordion type="single" collapsible className="bg-white bg-opacity-90 rounded-lg p-6 shadow-sm">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 pb-2">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-10 text-gray-600">
            <p>Не нашли ответ на свой вопрос? <a href="#" className="text-purple-500 hover:underline">Свяжитесь с нами</a></p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white bg-opacity-90 rounded-2xl p-8 sm:p-12 shadow-xl"
          >
            <div className="inline-block mb-6 p-3 bg-purple-100 rounded-full">
              <BookOpen className="h-10 w-10 text-purple-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">Начните свой путь к знаниям сегодня</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Присоединяйтесь к тысячам студентов, которые уже расширяют свои горизонты с нашими онлайн-лекциями
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-6 rounded-full text-lg font-medium hover:shadow-lg transition-all">
                Начать бесплатный период
              </Button>
              <Button variant="outline" className="px-8 py-6 rounded-full text-lg">
                Узнать больше
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-90">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О платформе</h3>
            <p className="text-gray-600">
              Образовательная платформа с онлайн-лекциями по различным дисциплинам для всех, кто стремится к знаниям.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <p className="text-gray-600">Email: info@lectures.ru</p>
            <p className="text-gray-600">Телефон: +7 (999) 123-45-67</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Подписаться на новости</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <Button className="rounded-l-none">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>© 2025 Образовательная платформа. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
