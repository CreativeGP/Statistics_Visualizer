let type = "Sticks";
let kind = "";
let settings = {
    samples: '100',
    deviation: '0.5',
    tdev: '',
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
        let slope = parseFloat(settings.deviation) / 100;
        for (let i = 0; i < parseInt(settings.samples); i++) {
            let beta = Math.sin(Math.random()*Math.PI/2) ** 2;
            let beta_left = (beta < 0.5) ? 2*beta : 2*(1-beta);
            let beta_right = (beta > 0.5) ? 2*beta-1 : 2*(1-beta)-1;
            if (settings.tdev == 't')
                data.push(beta * 100);
            else 
                data.push((slope*beta_left + (1-slope)*beta_right) * 100);
        }
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

    let spectrumize = () => {
        let spec = [];
        let flat_data = data.map(Math.floor);
        for (let i = 0; i < 100; i++) {
            spec.push(flat_data.filter(e => e == i).length);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let width = 500 / spec.length;
        let start = (w-500)/2;
        for (let i = 0, len = spec.length; i < len; i++) {
            ctx.fillStyle = 'white';
            ctx.fillRect(start+width*i, 500-spec[i]*3, width-1, spec[i]*3);
        }

        let _mean = ss.mean(data);
        let _mode = ss.mode(data.map(Math.floor));
        let _median = ss.median(data);
        let _stdev = ss.standardDeviation(data);

        console.log(data);
        console.log([_mean, _mode, _median, _stdev]);

        ctx.fillStyle = 'red';
        ctx.fillRect(start+width*_mean, 200, width-1, 300);

        ctx.fillStyle = 'blue';
        ctx.fillRect(start+width*_mode, 200, width-1, 300);

        ctx.fillStyle = 'purple';
        ctx.fillRect(start+width*_median, 200, width-1, 300);

        ctx.fillStyle = 'yellow';
        ctx.fillRect(start+width*_stdev, 200, width-1, 300);
};

    let redraw_text = () => $('h1').text(`Statistics Visualizer [${type}] ${kind}`);

    redraw();
    redraw_text();

    $('input').on('change blur', e => {
        settings[$(e.target).attr('id')] = $(e.target).val();
        regenerate();
        if (type == "Spectrum")
            spectrumize();
        else {
            redraw();
            // data.sort((a, b) => a - b);
            // kind = '*sorted*';
            // redraw_text();
        }
    });

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
            type = 'Sticks';
            kind = '';
            redraw_text();
            break;

        case 's':
            data.sort((a, b) => a - b);
            redraw();
            kind = '*sorted*';
            redraw_text();
            break;

        case 'p':
            spectrumize();
            type = 'Spectrum';
            kind = '';
            redraw_text();
            break;

        case '?':
            $('h4').text('>');
            break;
        }
    });
});

