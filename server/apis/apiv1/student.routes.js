const {Router} = require('express')
const config = require('config')
const auth = require('../../middleware/auth.middleware')
const router = Router()
const UUID = require('uuid')
const path = require('path')
const util = require('util')
const fs = require('fs')

// /api/v1/student/courses/:courseId/groups/:groupId
router.get(
  '/courses/:courseId/groups/:groupId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        courseName: 'Курс по питону',
        teacherFullName: 'Гурин Аркадий Дмитриевич',
        lessons: [
          {
            id: 10,
            name: 'Урок 10',
            tasksAccepted: 0,
            tasksTotal: 15
          },
          {
            id: 9,
            name: 'Урок 9',
            tasksAccepted: 0,
            tasksTotal: 15
          },
          {
            id: 8,
            name: 'Урок 8',
            tasksAccepted: 7,
            tasksTotal: 15
          },
          {
            id: 7,
            name: 'Урок 7',
            tasksAccepted: 7,
            tasksTotal: 15
          },
          {
            id: 6,
            name: 'Урок 6',
            tasksAccepted: 7,
            tasksTotal: 15
          },
          {
            id: 5,
            name: 'Урок 5',
            tasksAccepted: 7,
            tasksTotal: 15
          },
          {
            id: 4,
            name: 'Урок 4',
            tasksAccepted: 7,
            tasksTotal: 15
          },
          {
            id: 3,
            name: 'Урок 3',
            tasksAccepted: 7,
            tasksTotal: 15
          },
          {
            id: 2,
            name: 'Урок 2',
            tasksAccepted: 7,
            tasksTotal: 15
          },
          {
            id: 1,
            name: 'Урок 1',
            tasksAccepted: 15,
            tasksTotal: 15
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        lessonName: 'Урок 1',
        tasksAccepted: 4,
        tasksTotal: 7,
        tasks: [
          {
            id: 1,
            name: 'Задача 1',
            solution: {
              id: 1,
              subSolutionId: 1,
              status: 'accepted'
            }
          },
          {
            id: 2,
            name: 'Задача 2',
            solution: {
              id: 2,
              subSolutionId: 2,
              status: 'accepted'
            }
          },
          {
            id: 3,
            name: 'Задача 3',
            solution: {
              id: 3,
              subSolutionId: 3,
              status: 'accepted'
            }
          },
          {
            id: 4,
            name: 'Задача 4',
            solution: {
              id: 4,
              subSolutionId: 4,
              status: 'accepted'
            }
          },
          {
            id: 5,
            name: 'Задача 5',
            solution: {
              id: 5,
              subSolutionId: 5,
              status: 'rejected'
            }
          },
          {
            id: 6,
            name: 'Задача 6',
            solution: {
              id: 6,
              subSolutionId: 6,
              status: 'waiting'
            }
          },
          {
            id: 7,
            name: 'Задача 7'
          }
        ],
        materials: [
          {
            id: 1,
            name: 'Учебник. Урок 1'
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        taskName: 'Задача 1',
        body: '<html>\n' +
          ' <body>\n' +
          '  <div class="problem-statement">\n' +
          '   <h2 class="mt-8">\n' +
          '   </h2>\n' +
          '   <div class="legend">\n' +
          '    В файле\n' +
          '    <span style="font-weight: bold;">\n' +
          '     image.jpg\n' +
          '    </span>\n' +
          '    лежит изображение. Зеркально отразите его относительно центральной\n' +
          '      вертикальной оси. Для этого напишите функцию\n' +
          '    <span style="font-weight: bold;">\n' +
          '     mirror()\n' +
          '    </span>\n' +
          '    , в которой прочитайте изображение\n' +
          '      из файла\n' +
          '    <span style="font-weight: bold;">\n' +
          '     image.jpg\n' +
          '    </span>\n' +
          '    , преобразуйте его и сохраните в файл\n' +
          '    <span style="font-weight:\n' +
          '      bold;">\n' +
          '     res.jpg\n' +
          '    </span>\n' +
          '    .\n' +
          '   </div>\n' +
          '   <h2 class="mt-8">\n' +
          '    Формат ввода\n' +
          '   </h2>\n' +
          '   <div class="input-specification">\n' +
          '    Изображение\n' +
          '    <span style="font-weight: bold;">\n' +
          '     image.jpg\n' +
          '    </span>\n' +
          '    в текущей папке.\n' +
          '    <br/>\n' +
          '    <br/>\n' +
          '    <img alt="PIC" src="https://contest.yandex.ru/testsys/statement-image?imageId=97d898f9ca19e7deca1474bd3a97da7fc4847a9619c85934ba030df1c6e00d21"/>\n' +
          '   </div>\n' +
          '   <h2 class="mt-8">\n' +
          '    Формат вывода\n' +
          '   </h2>\n' +
          '   <div class="output-specification">\n' +
          '    Изображение\n' +
          '    <span style="font-weight: bold;">\n' +
          '     res.jpg\n' +
          '    </span>\n' +
          '    в текущей папке.\n' +
          '    <br/>\n' +
          '    <br/>\n' +
          '    <img alt="PIC" src="https://contest.yandex.ru/testsys/statement-image?imageId=7ef5e32009b813947875efed0b183a581a4b3263fb4bad53e477fbaae1e25104"/>\n' +
          '   </div>\n' +
          '  </div>\n' +
          ' </body>\n' +
          '</html>',
        solutionShort: {
          id: 1,
          subSolutionId: 1,
          status: 'accepted'
        },
        tasks: [
          {
            id: 1,
            solution: {
              id: 1,
              status: 'accepted'
            }
          },
          {
            id: 2,
            solution: {
              id: 2,
              status: 'accepted'
            }
          },
          {
            id: 3,
            solution: {
              id: 3,
              status: 'accepted'
            }
          },
          {
            id: 4,
            solution: {
              id: 4,
              status: 'accepted'
            }
          },
          {
            id: 5,
            solution: {
              id: 5,
              status: 'rejected'
            }
          },
          {
            id: 6,
            solution: {
              id: 6,
              status: 'waiting'
            },
          },
          {
            id: 7,
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        materialName: 'Учебник 1',
        body: '<html>\n' +
          ' <body>\n' +
          '  <section class="material__plan mt-10 mb-10">\n' +
          '   <nav>\n' +
          '    <ol class="ml-10">\n' +
          '     <li class="text-h5">\n' +
          '      <a class="material__link white--text" href="#1">\n' +
          '       Введение\n' +
          '      </a>\n' +
          '     </li>\n' +
          '     <li class="text-h5">\n' +
          '      <a class="material__link white--text" href="#2">\n' +
          '       Основные понятия\n' +
          '      </a>\n' +
          '     </li>\n' +
          '     <li class="text-h5">\n' +
          '      <a class="material__link white--text" href="#3">\n' +
          '       Создание классов\n' +
          '      </a>\n' +
          '     </li>\n' +
          '     <li class="text-h5">\n' +
          '      <a class="material__link white--text" href="#4">\n' +
          '       Методы классов\n' +
          '      </a>\n' +
          '     </li>\n' +
          '     <li class="text-h5">\n' +
          '      <a class="material__link white--text" href="#5">\n' +
          '       Инициализация экземпляров класса\n' +
          '      </a>\n' +
          '     </li>\n' +
          '     <li class="text-h5">\n' +
          '      <a class="material__link white--text" href="#6">\n' +
          '       Соглашения об именовании, вызов методов атрибутов\n' +
          '      </a>\n' +
          '     </li>\n' +
          '    </ol>\n' +
          '   </nav>\n' +
          '  </section>\n' +
          '  <section class="material__annotation v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-10 mb-10">\n' +
          '   <h2 class="mt-8">\n' +
          '    Аннотация\n' +
          '   </h2>\n' +
          '   <p>\n' +
          '    Одна из самых распространенных методик разработки программных продуктов — объектно-ориентированное программирование (ООП). При работе с функциями мы уже использовали принцип модульности (сокрытие сложного алгоритма за вызовом функций) и библиотеки (упаковка функций, решающих схожие задачи, в одно хранилище — библиотеку). В ООП появляется еще один пример модульности —\n' +
          '    <strong>\n' +
          '     объект\n' +
          '    </strong>\n' +
          '    . Объекты хранят внутри себя и данные, и обрабатывающие их функции. Изучению парадигмы объектно-ориентированного программирования и посвящены следующие уроки.\n' +
          '   </p>\n' +
          '  </section>\n' +
          '  <section class="material__chapter mt-10 mb-10">\n' +
          '   <h2 class="mt-8" id="1">\n' +
          '    Введение\n' +
          '   </h2>\n' +
          '   <p>\n' +
          '    Язык программирования Python появился в 1991 году. К этому времени была разработана теоретическая база объектно-ориентированного программирования, появились исследовательские языки программирования, проверившие эти идеи на практике, и даже возникло первое поколение объектно-ориентированных языков для широкого круга программистов.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Поэтому, ориентируясь на чужие успехи и неудачи, Гвидо ван Россум и его коллеги смогли спроектировать достаточно простую и мощную реализацию ООП. Python поддерживает ООП на сто процентов: все данные в нем являются объектами. Числа всех типов, строки, списки, словари, даже функции, модули и, наконец, сами типы данных — все это объекты!\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Давайте для начала рассмотрим несколько предметов из реального мира. Вообще говоря, прямой аналогии между объектами материального мира и объектами из мира программирования нет. Ведь в программировании есть объекты, которые обозначают какой-то процесс (например, функции), или состояние процесса, или вообще произвольные абстрактные понятия. Например, массив или число с плавающей точкой — сами по себе достаточно абстрактные понятия, которые имеют отдаленные аналоги в реальном мире. Но все же давайте пока порассуждаем о реальных объектах.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Представим себе комнату. В ней есть мебель: несколько столов, стулья, шкафы. Стулья могут отличаться цветом, формой, количеством ножек, но все равно мы всегда сможем отличить стул от шкафа.\n' +
          '   </p>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Важно!\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Если задуматься, у каждого\n' +
          '     <strong>\n' +
          '      объекта\n' +
          '     </strong>\n' +
          '     есть набор\n' +
          '     <strong>\n' +
          '      свойств\n' +
          '     </strong>\n' +
          '     и\n' +
          '     <strong>\n' +
          '      действия\n' +
          '     </strong>\n' +
          '     , в которых он может участвовать. Основываясь на этих\n' +
          '     <strong>\n' +
          '      свойствах\n' +
          '     </strong>\n' +
          '     (наличие сиденья) и\n' +
          '     <strong>\n' +
          '      действиях\n' +
          '     </strong>\n' +
          '     (на стуле можно сидеть), мы классифицируем объекты, то есть относим их к тому или иному\n' +
          '     <strong>\n' +
          '      классу\n' +
          '     </strong>\n' +
          '     .\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <div class="material__content-positioner d-flex justify-center">\n' +
          '    <img class="material__illustration" height="auto" src="https://yastatic.net/s3/lyceum/content/images/first-year/lesson-30/2.svg" width="680"/>\n' +
          '   </div>\n' +
          '  </section>\n' +
          '  <section class="material__chapter mt-10 mb-10">\n' +
          '   <h2 class="mt-8" id="2">\n' +
          '    Основные понятия\n' +
          '   </h2>\n' +
          '   <p>\n' +
          '    Давайте определим несколько терминов.\n' +
          '   </p>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Класс\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Описывает модель объекта, его свойства и поведение. Говоря языком программиста, класс — такой тип данных, который создается для описания сложных объектов.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Экземпляр\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Для краткости вместо «Объект, порожденный классом „Стул“» говорят «экземпляр класса „Стул“».\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Объект\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Хранит конкретные значения свойств и информацию о принадлежности к классу. Может выполнять методы.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Атрибут\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Свойство, присущее объекту. Класс объекта определяет, какие атрибуты есть у объекта. Конкретные значения атрибутов — характеристика уже не класса, а конкретного экземпляра этого класса, то есть объекта.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Метод\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Действие, которое объект может выполнять над самим собой или другими объектами.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <p>\n' +
          '    Чтобы стало чуть понятнее, давайте разберем на примере:\n' +
          '    <code>\n' +
          '     1\n' +
          '    </code>\n' +
          '    ,\n' +
          '    <code>\n' +
          '     2\n' +
          '    </code>\n' +
          '    ,\n' +
          '    <code>\n' +
          '     3\n' +
          '    </code>\n' +
          '    ,\n' +
          '    <code>\n' +
          '     "abc"\n' +
          '    </code>\n' +
          '    ,\n' +
          '    <code>\n' +
          '     [10, 20, 30]\n' +
          '    </code>\n' +
          '    — объекты. А\n' +
          '    <var>\n' +
          '     int\n' +
          '    </var>\n' +
          '    ,\n' +
          '    <var>\n' +
          '     str\n' +
          '    </var>\n' +
          '    ,\n' +
          '    <var>\n' +
          '     list\n' +
          '    </var>\n' +
          '    — классы. Да, все типы данных, которые мы изучали ранее, на самом деле — классы:\n' +
          '   </p>\n' +
          '   <ul>\n' +
          '    <li>\n' +
          '     <code>\n' +
          '      1\n' +
          '     </code>\n' +
          '     ,\n' +
          '     <code>\n' +
          '      2\n' +
          '     </code>\n' +
          '     ,\n' +
          '     <code>\n' +
          '      3\n' +
          '     </code>\n' +
          '     — экземпляры класса\n' +
          '     <var>\n' +
          '      int\n' +
          '     </var>\n' +
          '    </li>\n' +
          '    <li>\n' +
          '     <code>\n' +
          '      "abc"\n' +
          '     </code>\n' +
          '     — класса\n' +
          '     <var>\n' +
          '      str\n' +
          '     </var>\n' +
          '    </li>\n' +
          '    <li>\n' +
          '     <code>\n' +
          '      [10, 20, 30]\n' +
          '     </code>\n' +
          '     — экземпляр класса\n' +
          '     <var>\n' +
          '      list\n' +
          '     </var>\n' +
          '     , в который вложены экземпляры\n' +
          '     <var>\n' +
          '      int\n' +
          '     </var>\n' +
          '    </li>\n' +
          '   </ul>\n' +
          '   <p>\n' +
          '    Чтобы узнать, к какому классу относится тот или иной объект, можно воспользоваться функцией\n' +
          '    <var>\n' +
          '     type\n' +
          '    </var>\n' +
          '    .\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Например,\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">&gt;&gt;&gt; type(123)\n' +
          '\n' +
          '# =&gt; \'&lt;class \'int\'&gt;\'\n' +
          '\n' +
          '\n' +
          '\n' +
          '&gt;&gt;&gt; type([1, 2, 3])\n' +
          '\n' +
          '# =&gt; \'&lt;class \'list\'&gt;\'\n' +
          '\n' +
          '</code></pre>\n' +
          '  </section>\n' +
          '  <section class="material__chapter mt-10 mb-10">\n' +
          '   <h2 class="mt-8" id="3">\n' +
          '    Создание классов\n' +
          '   </h2>\n' +
          '   <p>\n' +
          '    Давайте создадим простейший класс, который будет моделировать обычный фрукт. На языке Python это будет выглядеть так:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class Fruit:\n' +
          '\n' +
          '    pass\n' +
          '\n' +
          '</code></pre>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      PEP 8\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Имена классов по стандарту именования PEP 8 должны начинаться с большой буквы. Встроенные классы (\n' +
          '     <var>\n' +
          '      int\n' +
          '     </var>\n' +
          '     ,\n' +
          '     <var>\n' +
          '      float\n' +
          '     </var>\n' +
          '     ,\n' +
          '     <var>\n' +
          '      str\n' +
          '     </var>\n' +
          '     ,\n' +
          '     <var>\n' +
          '      list\n' +
          '     </var>\n' +
          '     и др.) этому правилу не следуют, однако в вашем коде его лучше придерживаться — так делает большинство программистов на Python.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Определение класса\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Определение этого класса состоит из зарезервированного слова\n' +
          '     <var>\n' +
          '      class\n' +
          '     </var>\n' +
          '     , имени класса и пустой инструкции после отступа.\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Внутри класса с дополнительным уровнем отступов должны определяться его методы, но сейчас их нет. Однако хотя бы одна инструкция должна быть, поэтому приходится использовать пустую инструкцию-заглушку\n' +
          '     <var>\n' +
          '      pass\n' +
          '     </var>\n' +
          '     . Она предназначена как раз для таких случаев.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <p>\n' +
          '    Описав класс, мы создали модель фрукта.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Теперь создадим два конкретных фрукта —\n' +
          '    <strong>\n' +
          '     экземпляра класса\n' +
          '    </strong>\n' +
          '    <var>\n' +
          '     Fruit\n' +
          '    </var>\n' +
          '    :\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">a = Fruit()\n' +
          '\n' +
          'b = Fruit()\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    Переменные\n' +
          '    <var>\n' +
          '     a\n' +
          '    </var>\n' +
          '    и\n' +
          '    <var>\n' +
          '     b\n' +
          '    </var>\n' +
          '    содержат ссылки на два разных объекта — экземпляра класса\n' +
          '    <var>\n' +
          '     Fruit\n' +
          '    </var>\n' +
          '    , которые можно наделить разными атрибутами:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">a.name = \'apple\'\n' +
          '\n' +
          'a.weight = 120\n' +
          '\n' +
          '# теперь a - это яблоко весом 120 грамм\n' +
          '\n' +
          'b.name = \'orange\'\n' +
          '\n' +
          'b.weight = 150\n' +
          '\n' +
          '# а b - это апельсин весом 150 грамм\n' +
          '\n' +
          '</code></pre>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Важно!\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Атрибуты можно не только устанавливать, но и читать. При чтении еще не созданного атрибута будет появляться ошибка\n' +
          '     <var>\n' +
          '      AttributeError\n' +
          '     </var>\n' +
          '     . Вы ее часто увидите, допуская неточности в именах атрибутов и методов.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">print(a.name, a.weight)  # apple 120\n' +
          '\n' +
          'print(b.name, b.weight)  # orange 150\n' +
          '\n' +
          'b.weight -= 10  # Апельсин долго лежал на складе и усох\n' +
          '\n' +
          'print(b.name, b.weight)  # orange 140\n' +
          '\n' +
          ' \n' +
          '\n' +
          'c = Fruit()\n' +
          '\n' +
          'c.name = \'lemon\'\n' +
          '\n' +
          'c.color = \'yellow\'\n' +
          '\n' +
          '# Атрибут color появился только в объекте c.\n' +
          '\n' +
          '# Забыли добавить свойство weight и обращаемся к нему\n' +
          '\n' +
          'print(c.name, c.weight)  \n' +
          '\n' +
          '# Ошибка AttributeError, нет атрибута weight\n' +
          '\n' +
          '</code></pre>\n' +
          '  </section>\n' +
          '  <section class="material__chapter mt-10 mb-10">\n' +
          '   <h2 class="mt-8" id="4">\n' +
          '    Методы классов\n' +
          '   </h2>\n' +
          '   <p>\n' +
          '    На данный момент мы пользуемся объектами только для хранения соответствий между именами атрибутов и их значениями. Но на самом деле возможности объектов значительно шире. Давайте рассмотрим, как можно запрограммировать объекты на выполнение определенных действий:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class Greeter:\n' +
          '\n' +
          '    def hello_world(self):\n' +
          '\n' +
          '        print("Привет, Мир!")\n' +
          '\n' +
          ' \n' +
          '\n' +
          '\n' +
          '\n' +
          'greet = Greeter()\n' +
          '\n' +
          'greet.hello_world()  # выведет "Привет, Мир!"\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    После беглого осмотра этого кода видно, что внутри класса\n' +
          '    <var>\n' +
          '     Greeter\n' +
          '    </var>\n' +
          '    находится определение чего-то, похожего на функцию, печатающую фразу «Привет, Мир!» На самом деле мы написали метод, с синтаксисом вызова которого вы хорошо знакомы по методу строк\n' +
          '    <var>\n' +
          '     split\n' +
          '    </var>\n' +
          '    или методу списков\n' +
          '    <var>\n' +
          '     append\n' +
          '    </var>\n' +
          '    . Теперь мы можем создавать такие методы самостоятельно.\n' +
          '   </p>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Важно!\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     При создании собственных методов обратите внимание на два момента:\n' +
          '    </p>\n' +
          '    <ul>\n' +
          '     <li>\n' +
          '      Метод должен быть определен внутри класса (добавляется уровень отступов)\n' +
          '     </li>\n' +
          '     <li>\n' +
          '      У методов всегда есть хотя бы один аргумент, и\n' +
          '      <strong>\n' +
          '       первый по счету аргумент должен называться self\n' +
          '      </strong>\n' +
          '     </li>\n' +
          '    </ul>\n' +
          '   </section>\n' +
          '   <p>\n' +
          '    Аргументу\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    следует уделить особое внимание. В него передается тот объект, который вызвал этот метод. Поэтому\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    еще часто называют\n' +
          '    <strong>\n' +
          '     контекстным объектом\n' +
          '    </strong>\n' +
          '    . Рассмотрим чуть подробнее. Когда программа вызывает метод объекта, Python передает ему в первом аргументе экземпляр вызывающего объекта, который всегда связан с параметром\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    . Иными словами,\n' +
          '    <code>\n' +
          '     greet.hello_world()\n' +
          '    </code>\n' +
          '    преобразуется в вызов\n' +
          '    <code>\n' +
          '     Greeter.hello_world(greet)\n' +
          '    </code>\n' +
          '    . Этот факт объясняет особую важность параметра\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    и то, почему он всегда должен быть первым в любом методе объекта, который вы пишете. Вызывая метод, вы не должны передавать значение для\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    явно — интерпретатор сделает это за вас.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Вообще говоря,\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    — обычная переменная, которая может называться по-другому. Но так категорически не рекомендуется делать: соглашение об имени контекстного объекта — самое строгое из всех соглашений в мире Python. Его выполняют 99,9 % программистов. Если нарушить это соглашение, другие программисты просто не будут понимать ваш код. Кроме того, некоторые текстовые редакторы подсвечивают слово\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    цветом, и это удобно.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    В примере выше мы не передавали нашему методу никаких аргументов. Это довольно скучно, ведь мы уже умеем передавать аргументы функциям. Давайте расширим пример и добавим в наш класс два новых метода:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class Greeter:\n' +
          '\n' +
          '    def hello_world(self):\n' +
          '\n' +
          '        print("Привет, Мир!")\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def greeting(self, name):\n' +
          '\n' +
          '        \'\'\'Поприветствовать человека с именем name.\'\'\'\n' +
          '\n' +
          '        print("Привет, {}!".format(name))\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def start_talking(self, name, weather_is_good):\n' +
          '\n' +
          '        \'\'\'Поприветствовать и начать разговор с вопроса о погоде.\'\'\'\n' +
          '\n' +
          '        print("Привет, {}!".format(name))\n' +
          '\n' +
          '        if weather_is_good:\n' +
          '\n' +
          '            print("Хорошая погода, не так ли?")\n' +
          '\n' +
          '        else:\n' +
          '\n' +
          '            print("Отвратительная погода, не так ли?")\n' +
          '\n' +
          ' \n' +
          '\n' +
          ' \n' +
          '\n' +
          'greet = Greeter()\n' +
          '\n' +
          'greet.hello_world()     # Привет, Мир!\n' +
          '\n' +
          'greet.greeting("Петя")  # Привет, Петя!\n' +
          '\n' +
          ' \n' +
          '\n' +
          'greet.start_talking("Саша", True)  \n' +
          '\n' +
          '# Привет, Саша!\n' +
          '\n' +
          '# Хорошая погода, не так ли?\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    Значение\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    автоматически получается из объекта, на котором сделан вызов метода, но мы его пока никак не используем.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Давайте попробуем запоминать информацию из предыдущих вызовов методов. Напишем класс «Машина», которую, как известно, надо сначала завести, а потом уже ехать:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class Car:\n' +
          '\n' +
          '    def start_engine(self):\n' +
          '\n' +
          '        engine_on = True  # К сожалению, не сработает\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def drive_to(self, city):\n' +
          '\n' +
          '        if engine_on:  # Ошибка NameError\n' +
          '\n' +
          '            print("Едем в город {}.".format(city))\n' +
          '\n' +
          '        else:\n' +
          '\n' +
          '            print("Машина не заведена, никуда не едем")\n' +
          '\n' +
          ' \n' +
          '\n' +
          '\n' +
          '\n' +
          'c = Car()\n' +
          '\n' +
          'c.start_engine()\n' +
          '\n' +
          'c.drive_to(\'Владивосток\')\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    Итак, первая версия класса «Машина» специально сделана нерабочей, чтобы показать, что переменные внутри методов ведут себя точно так же, как и переменные функций. То есть если мы инициализируем переменную внутри метода, то после его завершения все созданные таким образом переменные уничтожаются и оказываются недоступны как следующему вызову этого же метода, так и другим методам. Под «уничтожением» мы понимаем исчезновение самих переменных, а не объектов, на которые они ссылаются. Если ссылка на объект сохранилась где-нибудь (например, мы вернули объект с помощью\n' +
          '    <var>\n' +
          '     return\n' +
          '    </var>\n' +
          '    ), он все еще доступен. Если ссылок не осталось, объект будет скоро переработан сборщиком мусора.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Напомним, что такие переменные называются\n' +
          '    <strong>\n' +
          '     локальными\n' +
          '    </strong>\n' +
          '    .\n' +
          '   </p>\n' +
          '  </section>\n' +
          '  <section class="material__chapter mt-10 mb-10">\n' +
          '   <h2 class="mt-8" id="5">\n' +
          '    Инициализация экземпляров класса\n' +
          '   </h2>\n' +
          '   <p>\n' +
          '    Но вернемся к методам. Пора нашей машине наконец поехать — и в этом нам поможет контекстный объект\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    . Он общий для всех методов класса, и именно в нем мы с помощью атрибутов сохраним информацию о состоянии двигателя:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class Car:\n' +
          '\n' +
          '    def start_engine(self):\n' +
          '\n' +
          '        self.engine_on = True\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def drive_to(self, city):\n' +
          '\n' +
          '        if self.engine_on:\n' +
          '\n' +
          '            print("Едем в город {}.".format(city))\n' +
          '\n' +
          '        else:\n' +
          '\n' +
          '            print("Машина не заведена, никуда не едем.")\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    Теперь наша машина отлично заведется и поедет:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">car1 = Car()\n' +
          '\n' +
          'car1.start_engine()\n' +
          '\n' +
          'car1.drive_to(\'Владивосток\')  # Едем в город Владивосток.\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    Однако одна проблема осталась. При попытке выехать на незаведенной машине\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">car2 = Car()\n' +
          '\n' +
          'car2.drive_to(\'Лиссабон\')\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    вместо красивого сообщения о том, что незаведенная машина не поедет, получим «падение» программы с ошибкой\n' +
          '    <var>\n' +
          '     AttributeError\n' +
          '    </var>\n' +
          '    (отсутствие атрибута или метода). Еще бы! Ведь атрибут создавался в методе\n' +
          '    <var>\n' +
          '     start_engine\n' +
          '    </var>\n' +
          '    , а мы не вызвали его для объекта\n' +
          '    <var>\n' +
          '     car2\n' +
          '    </var>\n' +
          '    .\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Кроме того, стоит добавить метод\n' +
          '    <var>\n' +
          '     stop_engine\n' +
          '    </var>\n' +
          '    , чтобы не только заводить машину, но и глушить двигатель. Этот метод помог бы нам избежать вышеуказанной ошибки, но странно глушить еще не заведенную машину, чтобы избежать ошибки: ведь интуитивно мы понимаем, что машина должна создаваться с выключенным двигателем.\n' +
          '   </p>\n' +
          '   <p>\n' +
          '    Нет ли способа задать значение атрибута\n' +
          '    <var>\n' +
          '     engine_on\n' +
          '    </var>\n' +
          '    по умолчанию? Да. Есть метод\n' +
          '    <var>\n' +
          '     __init__\n' +
          '    </var>\n' +
          '    , который относится к группе так называемых специальных методов, которые имеют особое значение для интерпретатора Python.\n' +
          '   </p>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Метод __init__\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Особое значение метода\n' +
          '     <var>\n' +
          '      __init__\n' +
          '     </var>\n' +
          '     заключается в том, что, если такой метод в классе определен, интерпретатор\n' +
          '     <strong>\n' +
          '      автоматически\n' +
          '     </strong>\n' +
          '     вызывает его при создании каждого экземпляра этого класса для инициализации экземпляра.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <p>\n' +
          '    Давайте воспользуемся этим, чтобы при создании объекта создать атрибут\n' +
          '    <var>\n' +
          '     engine_on\n' +
          '    </var>\n' +
          '    и записать в него False.\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class Car:\n' +
          '\n' +
          '    def __init__(self):\n' +
          '\n' +
          '        self.engine_on = False\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def start_engine(self):\n' +
          '\n' +
          '        self.engine_on = True\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def drive_to(self, city):\n' +
          '\n' +
          '        if self.engine_on:\n' +
          '\n' +
          '            print("Едем в город {}.".format(city))\n' +
          '\n' +
          '        else:\n' +
          '\n' +
          '            print("Машина не заведена, никуда не едем.")\n' +
          '\n' +
          ' \n' +
          '\n' +
          '\n' +
          '\n' +
          'car1 = Car()\n' +
          '\n' +
          'car1.start_engine()\n' +
          '\n' +
          'car1.drive_to(\'Владивосток\')  # Едем в город Владивосток.\n' +
          '\n' +
          'car2 = Car()\n' +
          '\n' +
          'car2.drive_to(\'Лиссабон\')     # Машина не заведена, никуда не едем.\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    Метод\n' +
          '    <var>\n' +
          '     __init__\n' +
          '    </var>\n' +
          '    после\n' +
          '    <var>\n' +
          '     self\n' +
          '    </var>\n' +
          '    может получать параметры, передаваемые ему при создании экземпляра:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class Car:\n' +
          '\n' +
          '    def __init__(self, color):\n' +
          '\n' +
          '        self.engine_on = False\n' +
          '\n' +
          '        self.color = color\n' +
          '\n' +
          '\n' +
          '\n' +
          '    def start_engine(self):\n' +
          '\n' +
          '        self.engine_on = True\n' +
          '\n' +
          '\n' +
          '\n' +
          '    def drive_to(self, city):\n' +
          '\n' +
          '        if self.engine_on:\n' +
          '\n' +
          '            print("{} машина едет в город {}.".format(self.color, city))\n' +
          '\n' +
          '        else:\n' +
          '\n' +
          '            print("{} машина не заведена, никуда не едем.".format(\n' +
          '\n' +
          '                self.color))\n' +
          '\n' +
          '\n' +
          '\n' +
          '\n' +
          '\n' +
          'car1 = Car(\'красная\')  # Создали машину красного цвета\n' +
          '\n' +
          '\n' +
          '\n' +
          'car2 = Car(\'синяя\')  # И еще одну синего\n' +
          '\n' +
          '\n' +
          '\n' +
          'car1.start_engine()\n' +
          '\n' +
          '# Обратите внимание, что мы завели только одну машину,\n' +
          '\n' +
          '# ту, на которую ссылается car1 (красную).\n' +
          '\n' +
          '\n' +
          '\n' +
          '# car2 -- это другой объект, он не изменится.\n' +
          '\n' +
          '\n' +
          '\n' +
          'car1.drive_to(\'Владивосток\')\n' +
          '\n' +
          '# красная машина едет в город Владивосток.\n' +
          '\n' +
          '\n' +
          '\n' +
          'car2.drive_to(\'Лиссабон\')\n' +
          '\n' +
          '# синяя машина не заведена, никуда не едем.\n' +
          '\n' +
          '</code></pre>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Важно!\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Еще раз обратите внимание на комментарии в тексте. Они показывают, что при записи атрибутов в\n' +
          '     <var>\n' +
          '      self\n' +
          '     </var>\n' +
          '     метод изменяет только свой контекстный объект. Мы знаем, что объекты класса совместно используют код методов класса (то есть поведение), но хранят свои собственные копии всех атрибутов данных (то есть состояние). Это достигается за счет связывания значений атрибутов с объектом, то есть с\n' +
          '     <var>\n' +
          '      self\n' +
          '     </var>\n' +
          '     .\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <p>\n' +
          '    Обсудим еще один вопрос: зачем нам понадобился метод\n' +
          '    <var>\n' +
          '     start_engine\n' +
          '    </var>\n' +
          '    , ведь его можно было бы заменить строчкой\n' +
          '    <code>\n' +
          '     car.engine_on = True\n' +
          '    </code>\n' +
          '    ? Казалось бы, это лишнее усложнение. На самом деле нет. При дальнейшей разработке нашей программы может оказаться, что завести двигатель можно только в машине, в которой есть бензин. Если бы мы в нескольких десятках мест программы написали\n' +
          '    <code>\n' +
          '     car.engine_on = True\n' +
          '    </code>\n' +
          '    , нам пришлось бы найти все эти места и вставить в них проверку на наличие бензина в баке. А с методом\n' +
          '    <var>\n' +
          '     start_engine\n' +
          '    </var>\n' +
          '    мы можем изменить только этот метод.\n' +
          '   </p>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Инкапсуляция\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Такая технология сокрытия информации о внутреннем устройстве объекта за внешним интерфейсом из методов называется\n' +
          '     <strong>\n' +
          '      инкапсуляцией\n' +
          '     </strong>\n' +
          '     . Надо стараться делать интерфейс методов достаточно полным. Тогда вы, как и другие программисты, будете пользоваться этими методами, а изменения в атрибутах не будут расползаться по коду, использующему ваш класс. Кроме того, инкапсуляция позволяет шире использовать такое понятие, как полиморфизм. О нем мы поговорим на следующем уроке.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <p>\n' +
          '    В некоторых языках программирования автор класса может закрыть доступ к атрибутам извне класса и заставить всех использующих его программистов работать только с методами. К сожалению, в Python так делать нельзя, однако стоит по возможности пользоваться только методами.\n' +
          '   </p>\n' +
          '  </section>\n' +
          '  <section class="material__chapter mt-10 mb-10">\n' +
          '   <h2 class="mt-8" id="6">\n' +
          '    Соглашения об именовании, вызов методов атрибутов\n' +
          '   </h2>\n' +
          '   <p>\n' +
          '    Давайте разберемся еще с одним примером. Напишем класс робота-почтальона, который должен разносить письма в определенные дома и квартиры. (Для простоты считаем, что робот обслуживает одну улицу, и не будем ее указывать.) Класс назовем длинным именем\n' +
          '    <var>\n' +
          '     RoboticMailDelivery\n' +
          '    </var>\n' +
          '    , чтобы показать, как в Python принято называть классы с длинным составным именем.\n' +
          '   </p>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      PEP 8\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Имя класса должно начинаться с большой буквы, между словами не должно быть прочерка, каждое слово внутри имени должно начинаться с большой буквы.\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Например,\n' +
          '     <var>\n' +
          '      RoboticMailDelivery\n' +
          '     </var>\n' +
          '     .\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <p>\n' +
          '    Текст примера:\n' +
          '   </p>\n' +
          '   <pre><code class="language-python hljs pl-10 pt-10 pr-10 pb-10 mt-6 mb-6">class RoboticMailDelivery:\n' +
          '\n' +
          '    def __init__(self):\n' +
          '\n' +
          '        self.house_flat_pairs = []\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def add_mail(self, house_number, flat_number):\n' +
          '\n' +
          '        \'\'\'Добавить информацию о доставке письма по номеру дома\n' +
          '\n' +
          '        house_number, квартирe flat_number.\'\'\'\n' +
          '\n' +
          '        self.house_flat_pairs.append((house_number, flat_number))\n' +
          '\n' +
          ' \n' +
          '\n' +
          '    def flat_numbers_for_house(self, house_number):\n' +
          '\n' +
          '        \'\'\'Вернуть список квартир в доме house_number,\n' +
          '\n' +
          '        в которые нужно доставить письма.\'\'\'\n' +
          '\n' +
          '        flat_numbers = []\n' +
          '\n' +
          '        for h, f in self.house_flat_pairs:\n' +
          '\n' +
          '            if h == house_number:\n' +
          '\n' +
          '                flat_numbers.append(f)\n' +
          '\n' +
          '        return flat_numbers\n' +
          '\n' +
          '</code></pre>\n' +
          '   <p>\n' +
          '    Метод\n' +
          '    <var>\n' +
          '     add_mail\n' +
          '    </var>\n' +
          '    добавляет кортеж (номер_дома, номер_квартиры) в список-атрибут с помощью метода\n' +
          '    <var>\n' +
          '     append\n' +
          '    </var>\n' +
          '    . Как видно, вызовы методов для объектов-атрибутов производят обычным образом, вызов метода дописывается справа от объекта:\n' +
          '    <code>\n' +
          '     self.house_flat_pairs.append(...)\n' +
          '    </code>\n' +
          '    .\n' +
          '   </p>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      PEP 8\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Для имен атрибутов и методов применяются те же правила, что и для имен переменных и функций. Имя должно быть записано в нижнем регистре, слова внутри имени разделяются подчеркиванием:\n' +
          '     <var>\n' +
          '      flat_numbers_for_house\n' +
          '     </var>\n' +
          '     ,\n' +
          '     <var>\n' +
          '      house_flat_pairs\n' +
          '     </var>\n' +
          '     .\n' +
          '    </p>\n' +
          '   </section>\n' +
          '   <section class="material__note v-card v-sheet theme--dark pl-10 pt-10 pr-10 pb-10 mt-6 mt-6 mt-10 mb-10">\n' +
          '    <p class="material__note-heading text-h5">\n' +
          '     <strong>\n' +
          '      Важно!\n' +
          '     </strong>\n' +
          '    </p>\n' +
          '    <p>\n' +
          '     Документация с описанием методов записывается в\n' +
          '     <code>\n' +
          '      \'\'\'многострочных строках\'\'\'\n' +
          '     </code>\n' +
          '     перед первой инструкцией как в функциях, так и в методах.\n' +
          '    </p>\n' +
          '   </section>\n' +
          '  </section>\n' +
          ' </body>\n' +
          '</html>'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        status: 'accepted',
        statusDate: Date.now(),
        lastSubSolution: {
          id: 421322,
          date: Date.now(),
          file: {
            path: 'https://yastatic.net/s3/lyceum/content/images/first-year/lesson-2/fy-2-1.png',
            mimeType: 'text/x-python',
            body: 'from discord.ext import commands\n' +
              'import pymorphy2\n' +
              '\n' +
              '\n' +
              'morph = pymorphy2.MorphAnalyzer()\n' +
              '\n' +
              '\n' +
              'class RandomThings(commands.Cog):\n' +
              '    def __init__(self, bot):\n' +
              '        self.bot = bot\n' +
              '\n' +
              '    @commands.command(name=\'help_bot\')\n' +
              '    async def help_bot(self, ctx):\n' +
              '        await ctx.send(\'Commands:\\n"#!numerals" for agreement with numerals\\n"#!alive" for define alive or not alive\\n"#!noun" for noun case (nomn, gent, datv, accs, ablt, loct) and number state (sing, plur)\\n"#!inf" for infinitive state\\n"#!morph" for full morphological analysis\')\n' +
              '\n' +
              '    @commands.command(name=\'numerals\')\n' +
              '    async def numerals(self, ctx, string, number):\n' +
              '        res = morph.parse(string)[0]\n' +
              '        word = res.make_agree_with_number(int(number)).word\n' +
              '        await ctx.send(f\'{number} {word}\')\n' +
              '\n' +
              '    @commands.command(name=\'alive\')\n' +
              '    async def alive(self, ctx, string):\n' +
              '        res = morph.parse(string)[0]\n' +
              '        await ctx.send(f\'{res.word} {"живой" if res.tag.animacy == "anim" else "не живой"}\')\n' +
              '\n' +
              '    @commands.command(name=\'noun\')\n' +
              '    async def noun(self, ctx, string, case, num):\n' +
              '        res = morph.parse(string)[0]\n' +
              '        result = res.inflect({case, num})\n' +
              '        await ctx.send(result.word)\n' +
              '\n' +
              '    @commands.command(name=\'inf\')\n' +
              '    async def inf(self, ctx, string):\n' +
              '        res = morph.parse(string)[0].normal_form\n' +
              '        await ctx.send(res)\n' +
              '\n' +
              '    @commands.command(name=\'morph\')\n' +
              '    async def morph(self, ctx, string):\n' +
              '        res = morph.parse(string)[0]\n' +
              '        await ctx.send(res)\n' +
              '\n' +
              '\n' +
              'bot = commands.Bot(command_prefix=\'#!\')\n' +
              'bot.add_cog(RandomThings(bot))\n' +
              'bot.run(TOKEN)'
          }
        }
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/history
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/history',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json( {
        answers: [
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          },
          {
            id: 421322,
            date: Date.now(),
            type: 'solution'
          },
          {
            id: 421322,
            date: Date.now(),
            type: 'solution'
          },
          {
            id: 421322,
            date: Date.now(),
            type: 'solution'
          },
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          },
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          },
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        name: 'Доработать',
        comment: 'Доработать',
        status: 'rejected'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        date: Date.now(),
        file: {
          path: 'https://yastatic.net/s3/lyceum/content/images/first-year/lesson-2/fy-2-1.png',
          mimeType: 'text/x-python',
          body: 'from discord.ext import commands\n' +
            'import pymorphy2\n' +
            '\n' +
            '\n' +
            'morph = pymorphy2.MorphAnalyzer()\n' +
            '\n' +
            '\n' +
            'class RandomThings(commands.Cog):\n' +
            '    def __init__(self, bot):\n' +
            '        self.bot = bot\n' +
            '\n' +
            '    @commands.command(name=\'help_bot\')\n' +
            '    async def help_bot(self, ctx):\n' +
            '        await ctx.send(\'Commands:\\n"#!numerals" for agreement with numerals\\n"#!alive" for define alive or not alive\\n"#!noun" for noun case (nomn, gent, datv, accs, ablt, loct) and number state (sing, plur)\\n"#!inf" for infinitive state\\n"#!morph" for full morphological analysis\')\n' +
            '\n' +
            '    @commands.command(name=\'numerals\')\n' +
            '    async def numerals(self, ctx, string, number):\n' +
            '        res = morph.parse(string)[0]\n' +
            '        word = res.make_agree_with_number(int(number)).word\n' +
            '        await ctx.send(f\'{number} {word}\')\n' +
            '\n' +
            '    @commands.command(name=\'alive\')\n' +
            '    async def alive(self, ctx, string):\n' +
            '        res = morph.parse(string)[0]\n' +
            '        await ctx.send(f\'{res.word} {"живой" if res.tag.animacy == "anim" else "не живой"}\')\n' +
            '\n' +
            '    @commands.command(name=\'noun\')\n' +
            '    async def noun(self, ctx, string, case, num):\n' +
            '        res = morph.parse(string)[0]\n' +
            '        result = res.inflect({case, num})\n' +
            '        await ctx.send(result.word)\n' +
            '\n' +
            '    @commands.command(name=\'inf\')\n' +
            '    async def inf(self, ctx, string):\n' +
            '        res = morph.parse(string)[0].normal_form\n' +
            '        await ctx.send(res)\n' +
            '\n' +
            '    @commands.command(name=\'morph\')\n' +
            '    async def morph(self, ctx, string):\n' +
            '        res = morph.parse(string)[0]\n' +
            '        await ctx.send(res)\n' +
            '\n' +
            '\n' +
            'bot = commands.Bot(command_prefix=\'#!\')\n' +
            'bot.add_cog(RandomThings(bot))\n' +
            'bot.run(TOKEN)'
        }
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/send_solution
router.post(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/send_solution',
  [
    // auth,
  ],
  async (req, res, next) => {
    try {
      const file = req.files.file
      const fileName = file.name
      const directoryName = `${UUID.v4()}-${Date.now().toString()}`
      const userLogin = 'gurinarkady'
      const size = file.data.length
      const fileExtension = path.extname(fileName)
      const filePath = `/solutions/${directoryName}/${userLogin}'s solution${fileExtension}`

      if (['.zip', '.rar', '.py', '.php', '.js', '.ts', '.pas', '.cpp', '.vue', '.jsx',
        '.html', '.css', '.sass', '.scss', '.cs', '.java', '.txt'].indexOf(fileExtension) === -1)
        return res.status(400).json(
          { message: 'Неподдерживаемое расширение файла. Поддерживаемыми являются: .zip, .rar, .py, .php, .js, .ts, .pas, .cpp, .vue, .jsx, .html, .css, .sass, .scss, .cs, .java, .txt' }
          )
      if (size > 1024 * 1024) {
        return res.status(400).json({ message: "Размер файла не должен превышать 1мб"})
      }

      await fs.promises.mkdir(`./public/solutions/${directoryName}`, { recursive: true })
      await util.promisify(file.mv)('./public' + filePath)

      res.json({
        taskId: 1,
        solutionId: 1
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
