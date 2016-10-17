/*
 * CLIENT-SERVER PROTOCOL
 * Описание протокола для работы клиента с сервером storage swarm. Протокол может работать поверх http,
 * а может и просто через пайпы.
 * Используется json как формат данных  
 */


/*
 * create storage
 * Создаёт хранилище, соединяется с другими серверами для обеспечения репликации(если это нужно).
 */

var request = {
  type : 'sc',
  replication : 0, //цифры от 0 до 9. Означает на сколько узлов данные реплицируются
  size : '1GB' //Сколько бы не было указано, реально потребуется в 10 раз больше места. Нужно для того, чтобы предоставить другим в обмен на реплицирование на их узлах.
};

var response = {
   id : 'someid' //некоторый id, который затем можно использовать для доступа к хранилищу
};

/*
 * destroy storage
 * Удаляет хранилище. Если хранилище удаляет тот, кто его создал и при это не осталось ни одного, кто бы
 * соединился с хранилищем в режиме зеркалирования - хранилище удаляется со всех узлов, где было 
 * реплицированно. Фактически им посылается соответствующий запрос за авторством того, кто создал хранилище.
 */

var request = {
  type : 'sd'
}

var response = {
  status : 200
}

/*
 * storage mount
 * Монтирует хранилище в виде локально доступной папки с файлами. В дальнейшем с содержимым хранилища можно
 * работать средствами операционной системы и любыми программами. 
 */

var request = {
  type : 'sm',
  mode : 'client' /*
		   Возможные значения:
		   client  
		      означает работа с хранилищем в реальном времени, получаем только то, что 
		      запрашивается. То есть если хранилище не наше, а удалённое, то запросы напрямую
		      передаются удалённому хранилищу с минимально необходимой буферизацией. Возможно постепенно
		      полное скачивание содержимого. В этом случае клиент может стать одним из реплицирующи узлов.
                   mirror
		      Происходит полное скачивание хранилища и подключение как одного из реплицирующих узлов.
		      Изменения в локальном слепке хранилища приводят к посылу соответствующих запросов на
		      другие реплицирующие узлы. В принципе этот режим похож на client, но с тремя отличиями
		      + происходит сначала полное скачивание содержимого и подключение клиентся как реплицирующего узла, а потом работа с хранилищем
		      + клиент-зеркало это почти как тот, кто создал хранилище. Если создатель хранилище удалит
		        его, то хранилище останется существовать до тех пор, пока есть хотя бы один клиент зеркало
		      + если у хранилища отключена репликация, то в режиме client никакого реплицирующего узла
		        не создаётся. Владелец остаётся единственным узлом хранящим данные. В режиме же mirror
		        клиент всё равно становится реплицирующим узлом. 
                        Можно такой пример применения: у вас есть десктоп, ноутбук и смартфон. Вы хотите, чтобы
		        на всех них был один и тот же набор вашей любимой музыки. В этом случае вы создаёте
		        хранилище на любом устройстве, а затем на других устройствах подключаетесь в режиме
		        mirror, получая полностью синхронизированное хранилище и параллельно с любого устройства
		        работая с ним. Также такой режим не приводит к увеличению места под хранение хранилища.
		        Потому что репликация идёт не в общем виде, а как зеркало, то есть узел владелец не обязан
		        выделять у себя место под данных реплицирующих узлов-зеркал.
  */,
  id : 'storageid',
  path : '/somefolder' //путь до точки монтирования
}

var response = {
  status : 200
}

/*
 * umount
 * Отсоединение хранилища. При этом данные хранилища не удаляются, а хранятся для следующего соединения.
 * Чтобы удалить данные, нужно удалить их из папки временных данных программы.
 */

var request = {
  type : 'sum',
  path : '/somefolder'
}

var response = {
  status : 200
}

/*
 * Далее работа с хранилищем возможна двумя способами. Как с уже примонтированной папкой с файлами либо
 * посредством http rest, то  есть get на id хранилища даёт список файлов, а get и put на файлы даёт
 * чтение и запись соответственно. В дальнейшем тут будут пояснения по части этих моментов, потому что
 * это тоже часть протокола.
 */


/*
 * SERVER-SERVER protocol
 * Описание протокола общения серверов между друг другом. То есть это протокол работы storage swarm.
 * Включает в себя несколько секций:
 * + протокол поиска, взаимопозицирования и координации. Либо это будет dht либо его аналог
 * + протокол репликации и синхронизации хранилищь серверов
 * + протокол для работы с хранилищами в реальном времени. Во многом повторяет секцию протокола client-server,
 *   предназначенной для описания работы с данными хранилища между клиентом и сервером. Возможно использование
 *   одного из уже существующих протоколов или сразу нескольких(webdav, 9p) и тд. Нескольких, потому что не одним
 *   http мир живёт.
 */