sphere
======

A global network that is designed to distribute, to use, to search and to compute the every data.
Internally, this is composition of services that is building on dsa. Set of the running services, deployed odifferent environment(device, OS, browser, etc) is forming node of network. Nodes are combining in the networks and those in the global network.

RU
Сфера состоит из программ, которые соединяются друг с другом и образуют сеть, где все объекты хранятся и обрабатываются сообща.

С точки зрения пользователя, сфера это программа позволяющая создавать, редактировать, находить и открывать объекты следующих типов:
- ссылка
- текст
- изображение
- видео
- аудио
- документ
  подобно холсту графических редакторов, на который можно нанести любые из выше указанных объектов и визуально их спозиционировать
- список
  просто список из любых, выше описанных объектов

Пользователь может найти уже существующий объект, просмотреть его или отредактировать, так и создать свой. Каждому объекту при создании задаётся ключ(пароль), который исопользуется создателем чтобы в дальнейшем изменять объект.
На данный момент это программа предполагает web интерфейс, специально адаптированный для использования на крайне слабых устройствах, таких как телефон. Такая программа может быть запущена на любом устройствах(компьютертелефон, телевизор)

Из базовых объектов, можно, комбинируя и выстраивая связи, получить древовидные системы хранения данных. Например: аналог википедии можно сделать используя документ, текст, изображение и видео.
Но можно использовать сеть и более комплексно. Возьмём такой пример. Есть некий город, есть два человека. Один постоянно пересекает город с запада на восток, другой с юга на север. Есть некоторое количество пассажиров, который передвигаются постоянно с запада на восток и с юга на север. И конечно же есть автобусы, частные извозчики, таксисты да мало ли кто ещё, кто заинтересован в перевозке всех этих людей. 
Итак, человек ЗВ, используя свои знания, создаёт в сети набор объектов, допустим объекты: Остановка, в которых описывает особенности каждой остановки, на которой останавливается(какие маршруты ездят, как часто, по каким дням, сколько народу едет в разное время дня, тут важно, что человек владеет реальной информацией, а не декларируемой в рассписании). Другие пассажиры, находя эти объекты, могут добавлять и редактировать какие-то из них. Вместе они создают что-то вроде карты объективной истины того, что происходит на самом деле на этом направлении с транспортном(в какое время и как). 
Ту же работу, но на своём направлении делает человек ЮС и пассажиры на ЮС направлении. Пассажиры обоих направлений в определённый момент времени замечают, что некоторые объекты(перекрёстные остановки) пересекаются и добавляют соответствующие объекты и вносят изменения, что в итоге получается крестоподобное облако объектов, дающее много полезной информации всем пассажирам. 
В некоторое время, перевозчики, обнаруживают это крестоподобное облако объектов, находят его себе полезным и подстраивают свои маршруты под эту информацию(иными словами бомбилы и автобусники устремляются к пассажирам точно зная, где и когда они их ожидают). Но перевозчики вносят и свою лепту, они добавляют свои объекты, информируя пассжиров о своём транспорте, спрашивая людей могут ли те сгруппироваться в тот или иной момент, чтобы набрался автобус. То есть идёт уже совместная работа над маршрутами. Более того, перевозчики могут рассказывать о своих проблемах(деньги нужны на новый автобус, или возможно нужна помощь в получении документов, мало ли что бывает). Пассажиры могут выссказывать свои пожелания(холодно зимой в автобусе, маленькие автобусы, поздно не ходят и тд) и вместе с перевозчиками находить возможные решения.
Всё это вполне решаемо с помощью базовых объектов, документов,списков и ссылок. В редких случая для этого, наиболее подкованными пользователями, создаются произвольные объекты на javascript. 


 это набор сервисов, сознанных с использованием
набора компонентов dsa. Каждый из сервисов, формирующих узел, может быть запущен в различных окружениям(устройствах, операционных системах, браузерах). Узлы соединяясь, образуют сети, которые в свою очередь формируют единую глобальную сеть.
- произвольный объект
  для создания произвольных объектов используются средства разработки сферы, которые дают возможность
  создавать объекты на javascript, которые имеют доступ к средствам сети( то есть могут создавать свои объекты, находить и считывать другие объекты и взаимодействовать с объектами). Таким образом можно создавать различные объекты, которые взаимодействуя, являются ничем иным, как сложной программой.
