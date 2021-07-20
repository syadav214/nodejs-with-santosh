var amqp = require('amqplib/callback_api');


amqp.connect('amqp://guest:guest@localhost:5672/cs', function(err, conn) {
    if (err) {
        console.log(err.message);
    }

    if (conn) {
        conn.createChannel(function(err, ch) {

            if (err) {
                console.log(err.message);
            }

            if (ch) {
                var q = 'wausermsgs';

                ch.assertQueue(q, { durable: true });

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
                ch.consume(q, function(msg) {
                    console.log(" [x] Received %s", msg.content.toString());
                }, { noAck: true });
            }

        });
    }
});