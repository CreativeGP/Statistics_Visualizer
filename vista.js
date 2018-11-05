let type = "Sticks";
let kind = "";
let settings = {
    datas: '100',
};

$(() => {
    var w = $('#wrapper').width();
    var h = $('#wrapper').height();
    $('#view').attr('width', w);
    $('#view').attr('height', h);

    let data = [10, 80, 99];
    let canvas = document.getElementById('view');
    let ctx = canvas.getContext('2d');


    let regenerate = () => {
        data = [];
        for (let i = 0; i < parseInt(settings.datas); i++)
            data.push(Math.random() * 100);
        redraw();
    };

    let redraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let width = 500 / data.length;
        let start = (w-500)/2;
        for (let i = 0, len = data.length; i < len; i++) {
            ctx.fillStyle = 'white';
            ctx.fillRect(start+width*i, 500-data[i]*3, width-1, data[i]*3);
        }
    };

    let redraw_text = () => $('h1').text(`Statistics Visualizer [${type}] ${kind}`);

    redraw();
    redraw_text();



    document.addEventListener('keydown', e => {
        if ($('h4').text() != "") {
            if (e.key == "Enter") {
                settings[$('h4').text().substr(1).split('=')[0].trim()] =
                    $('h4').text().substr(1).split('=')[1].trim();
                $('h4').text("");
            } else if (e.key == "Escape") {
                $('h4').text("");
            } else
                $('h4').text($('h4').text() + e.key);
            return;
        }

        switch (e.key) {
        case 'r':
            regenerate();
            kind = '';
            redraw_text();
            break;
        case 's':
            data.sort((a, b) => a - b);
            redraw();
            kind = '*sorted*';
            redraw_text();
            break;

        case '?':
            $('h4').text('>');
            break;
        }
    });
});

