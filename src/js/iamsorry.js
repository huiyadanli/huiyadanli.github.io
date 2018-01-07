
navigator.getUserMedia_ = (   navigator.getUserMedia
               || navigator.webkitGetUserMedia 
               || navigator.mozGetUserMedia 
               || navigator.msGetUserMedia);

function average(arrayOfNumbers) {
    var sum = 0;
    var length = arrayOfNumbers.length
    for (var i = 0; i < length; ++i) {
        sum += arrayOfNumbers[i]
    }
    return (sum / length);
}

Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}
String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
};

function bubbleSort(arr) {
    var sorted = false;
    var steps = [];

    while (!sorted) {
        sorted = true
        for (var i=0; i<arr.length-1; ++i) {
            steps.push(arr.slice())
            if (arr[i] > arr[i+1]) {
                arr.swap(i, i+1)
                sorted = false;
            }
        }
        steps.push(arr.slice())
    }
    return steps;
}

function setHash(str, title) {
    window.location.replace('#'+str)
    // window.history.replaceState({}, title, '#'+str)
    // ^ this one adds entries to the browser history in a terrible way
    // window.location.hash = str;
    // ^ this is the naive one that also adds things to browser history
}


var currentFun = 'click';
function setCurrentFun(str) {
    currentFun = str;
}

    var hash = window.location.hash;

    if (hash.startsWith('#diy')) {
        hash = decodeURI(hash)
        console.log(hash)
        try {
            var currentFun = 'diy'
            var frameRate = hash.split('.')[1]
            $('input[type="range"]').val(frameRate)
            var frames = hash.split('.').slice(2, 100000000).map(function(str) { 
                if (str == '') {
                    return '.';
                } else if (str.startsWith('\\n')) {
                    return '.'+str;
                }
                return str;
            }).join('').split('\\n')
            $('textarea').val(frames.join('\n'))
            $('#diy').slideDown()
        } catch(e) {
        }
    }


    $(document).on('mousemove', function(e) {
        window.mouseX = e.pageX;
    });
    window.up = false;
    window.down = false;
    window.space = false;
    Mousetrap.bind('up', function() { window.up = true }, 'keydown')
    Mousetrap.bind('up', function() { window.up = false }, 'keyup')
    Mousetrap.bind('down', function() { window.down = true }, 'keydown')
    Mousetrap.bind('down', function() { window.down = false }, 'keyup')
    Mousetrap.bind('space', function() { window.space = true }, 'keydown')
    Mousetrap.bind('space', function() { window.space = false }, 'keyup')




    // $('a').on('click', function(evt) {
    //     evt.preventDefault()
    //     currentFun = $(this).attr('href').replace('#', '')
    //     if (currentFun == 'diy') {
    //         $('#diy').slideDown()
    //     } else {
    //         $('#diy').slideUp()
    //     }
    // })
    

    var now = 0;
    var tick = function() {
        now += 50;
        FUNctions[currentFun](now, state[currentFun]) // current frame from table of functions
        setTimeout(tick, 50);
    }




    state = {
        click: {
            past: 0,
            index: 0
        },
        shark: {
            position: 0,
            waterLength: 30,
            right: true,
            past: 0
        },
        swim: {
            position: 0,
            waterLength: 30,
            right: true,
            past: 0
        },
        plane: {
            position: 0,
            skyLength: 150,
            right: true,
            propeller: '|'
        },
        flip: {
            currentFrameIndex: 0,
            right: true
        },
        bubblesort: {
            past: 0,
            steps: bubbleSort([4,5,3,0,1,2]),
            index: 0
        },
        O: {
            index: 0,
            past: 0,
        },
        squiggle: {
            currentFrameIndex: 0,
            past: 0,
            prevHash: ''
        },
        wave: {
            index: 0,
            right: true,
            prevMouseX: 0
        },
        wave2: {
            index: 0,
            right: true,
            prevMouseX: 0
        },
        bounce: {
            position: 0,
            right: true
        },
        listen: {
            hasSetup: false,
            isSettingUp: false,
            context: (typeof webkitAudioContext == 'undefined') ? new AudioContext() : new webkitAudioContext(),
            volume: 0
        },
        diy: {
            index: 0,
            past: 0
        },
        pewpew: {
            shipIndex: 2,
            score: 0,
            dead: false,
            bullets: [],
            enemies: [
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ]
        }
    };
    FUNctions = {
        click: function(now, state) {
            if ((now-state.past) > 1000) {
                var msg = ['CLICK', '  A', 'LINK']
                setHash(msg[state.index], "i'm sorry")

                state.index = state.index == msg.length-1 ? 0 : state.index+1;
                state.past = now
            }
        },
        loading: function() {
            var loading = {
                ' |': ' /',
                ' /': ' \u2013',
                ' \u2013': ' \\',
                ' \\': ' |'
            }
            var hash = window.location.hash.replace('#', '')
            if (!(hash in loading)) {
                setHash(' |', 'loading')
            } else {
                setHash(loading[hash], 'loading')
            }
        },
        shark: function(now, state) {
            var str = ''
            var shark = state.right ? '|\\' : "/|"
            for (var i=0; i < state.waterLength; ++i) {
                if (i == state.position) {
                    str += shark
                } else if (i == state.waterLength-1) {
                    str += '#'
                } else {
                    str += '_'
                }
            }
            state.position += (state.right ? 1 : -1);
            
            if (state.position > state.waterLength-3) {
                state.right = false;
            } else if (state.position <= 0){
                state.right = true
            }

            setHash(str, 'shaaark')
        },
        swim: function(now, state) {
            var str = ''
            var shark = state.right ? '|\\' : "/|"

            var arm = ['/','-','\\'][state.position % 3]
            var swimmer = state.right ? '>-'+arm+'o' : 'o'+arm+'-<';

            var pair = state.right ? shark+'~~~~'+swimmer : swimmer+'~~~~'+shark;

            for (var i=0; i < state.waterLength; ++i) {
                if (i == state.position) {
                    str += pair
                } else {
                    str += '~'
                }
            }
            state.position += (state.right ? 1 : -1);
            
            if (state.position > state.waterLength-2) {
                state.right = false;
            } else if (state.position <= 0){
                state.right = true
            }

            setHash(str, 'swim')
        },
        plane: function(now, state) {
            var str = ''
            var propFrames = {
                '|': '/',
                '/': '-',
                '-': '\\',
                '\\': '|'
            }
            var propeller = state.propeller
            var body = state.right ? '`--//->' : "<-\\\\--'"
            var plane = state.right ? (body+propeller) : (propeller+body)
            for (var i=0; i < state.skyLength; ++i) {
                if (i == state.position) {
                    str += plane
                    i = i+plane.length
                } else {
                    str += ' '
                }
            }
            state.position += state.right ? 1 : -1;
            if (state.position >= state.skyLength-1) {
                state.right = false;
            } else if (state.position <= 0){
                state.right = true
            }
            state.propeller = propFrames[state.propeller]

            setHash(str, 'plane')
        },
        O: function(now, state) {
            if (now - state.past > 90) {
                var frames = [
                    ':O                #',
                    '  \u00D6               #',
                    '   O:             #',
                    '     O\u0324            #',
                    '      :O          #',
                    '        \u00D6         #',
                    '          O:      #',
                    '            O\u0324     #',
                    '             :O   #',
                    '               \u00D6  #',
                    '                O:#',
                    '               \u00D6  #',
                    '             :O   #',
                    '            O\u0324     #',
                    '          O:      #',
                    '        \u00D6         #',
                    '      :O          #',
                    '     O\u0324            #',
                    '   O:             #',
                    '  \u00D6               #',
                ];
                if (state.index > frames.length - 1) {
                    state.index = 0;
                }

                setHash(frames[state.index], ':O');

                state.index += 1;
                state.past = now;
            }
        },
        flip: function(now, state) {
            var frames = [
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\ \u252C\u2500\u252C',

                '(\\\u00B0\u25A1\u00B0)\\  \u252C\u2500\u252C',
                '(\\\u00B0\u25A1\u00B0)\\  \u252C\u2500\u252C',

                '(-\u00B0\u25A1\u00B0)-  \u252C\u2500\u252C',
                '(-\u00B0\u25A1\u00B0)-  \u252C\u2500\u252C',

                '(\u256F\u00B0\u25A1\u00B0)\u256F    ]',
                '(\u256F\u00B0\u25A1\u00B0)\u256F    ]',
                '(\u256F\u00B0\u25A1\u00B0)\u256F    ]',
                '(\u256F\u00B0\u25A1\u00B0)\u256F    ]',
                
                '(\u256F\u00B0\u25A1\u00B0)\u256F  \uFE35  \u253B\u2501\u253B',
                '(\u256F\u00B0\u25A1\u00B0)\u256F  \uFE35  \u253B\u2501\u253B',
                '(\u256F\u00B0\u25A1\u00B0)\u256F  \uFE35  \u253B\u2501\u253B',
                '(\u256F\u00B0\u25A1\u00B0)\u256F  \uFE35  \u253B\u2501\u253B',

                '(\u256F\u00B0\u25A1\u00B0)\u256F       [',
                '(\u256F\u00B0\u25A1\u00B0)\u256F       [',
                '(\u256F\u00B0\u25A1\u00B0)\u256F       [',
                '(\u256F\u00B0\u25A1\u00B0)\u256F       [',

                '(\u256F\u00B0\u25A1\u00B0)\u256F       \uFE35  \u252C\u2500\u252C',
                '(\u256F\u00B0\u25A1\u00B0)\u256F       \uFE35  \u252C\u2500\u252C',
                '(\u256F\u00B0\u25A1\u00B0)\u256F       \uFE35  \u252C\u2500\u252C',
                '(\u256F\u00B0\u25A1\u00B0)\u256F       \uFE35  \u252C\u2500\u252C',

                '(\u256F\u00B0\u25A1\u00B0)\u256F                 ]',
                '(\u256F\u00B0\u25A1\u00B0)\u256F                 ]',
                '(\u256F\u00B0\u25A1\u00B0)\u256F                 ]',
                '(\u256F\u00B0\u25A1\u00B0)\u256F                 ]',

                '(\u256F\u00B0\u25A1\u00B0)\u256F               \uFE35  \u253B\u2501\u253B',
                '(\u256F\u00B0\u25A1\u00B0)\u256F               \uFE35  \u253B\u2501\u253B',
                '(\u256F\u00B0\u25A1\u00B0)\u256F               \uFE35  \u253B\u2501\u253B',
                '(\u256F\u00B0\u25A1\u00B0)\u256F               \uFE35  \u253B\u2501\u253B',

                '(\u256F\u00B0\u25A1\u00B0)\u256F                         [',
                '(\u256F\u00B0\u25A1\u00B0)\u256F                         [',
                '(\u256F\u00B0\u25A1\u00B0)\u256F                         [',
                '(\u256F\u00B0\u25A1\u00B0)\u256F                         [',

                '(\\\u00B0-\u00B0)\\                            \uFE35  \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                            \uFE35  \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                            \uFE35  \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                            \uFE35  \u252C\u2500\u252C',

                '(\\\u00B0-\u00B0)\\                                     ]',
                '(\\\u00B0-\u00B0)\\                                     ]',
                '(\\\u00B0-\u00B0)\\                                     ]',
                '(\\\u00B0-\u00B0)\\                                     ]',

                '(\\\u00B0-\u00B0)\\                                     \uFE35 \u253B\u2501\u253B',
                '(\\\u00B0-\u00B0)\\                                     \uFE35 \u253B\u2501\u253B',
                '(\\\u00B0-\u00B0)\\                                     \uFE35 \u253B\u2501\u253B',
                '(\\\u00B0-\u00B0)\\                                     \uFE35 \u253B\u2501\u253B',

                '(\\\u00B0-\u00B0)\\                                               [',
                '(\\\u00B0-\u00B0)\\                                               [',
                '(\\\u00B0-\u00B0)\\                                               [',
                '(\\\u00B0-\u00B0)\\                                               [',

                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
                '(\\\u00B0-\u00B0)\\                                              \u252C\u2500\u252C',
            ]

            setHash(' '+frames[state.currentFrameIndex], 'flip')

            
            if (state.currentFrameIndex >= frames.length-1) {
                state.right = false;
            } else if (state.currentFrameIndex <= 0){
                state.right = true
            }
            
            state.currentFrameIndex += state.right ? 1 : -1

        },
        bubblesort: function(now, state) {
            if ((now-state.past) > 1000) {
                var bars = [ '\u2581', '\u2583', '\u2584', '\u2585', '\u2586', '\u2587' ]

                var step = state.steps[state.index];
                var hash = ''
                for (var i=0; i < step.length; ++i) {
                    var num = step[i];
                    if (state.index % bars.length == i) {
                        hash += '['+bars[num]+']'
                    } else {
                        hash += bars[num]
                    }
                }

                state.index = state.index >= state.steps.length-1 ? 0 : state.index+1;
                state.past = now;

                setHash(hash, 'bubblesort')
            }
        },
        squiggle: function(now, state) {
            if (now - state.past > 100) {
                var frames = [
                    // '_',
                    // '\u2a3c',
                    // '\u2290',
                    ' \u0332',
                    '\ufead',
                    '\ufb24',
                    '\u154a',
                    '5',
                    '5 \u035e',
                    // '5 \u035e  \u0305 \u031a',
                    '5 \u035e \u0305\u1423',
                    // '5 \u035e \ufb27',
                    '5 \u035e\u1548',
                    '5 \u035e\u01a7',
                    '5 \u035e\u01a7_',
                ]

                var frame = frames[state.currentFrameIndex];
                var hash = state.prevHash + frame;
                if (state.currentFrameIndex >= frames.length-1) {
                    state.prevHash += frame;
                    state.currentFrameIndex = 0;
                } else {
                    state.currentFrameIndex += 1;
                }

                state.past = now;

                setHash(hash, 'squiggle')
            }
        },
        wave: function(now, state) {
            var wave = ['\u00B8', '.', '\u00B7', '\u00B4', '\u00AF', '`', '\u00B7', '.', '\u00B8']
            var hash = ''
            for (var i=0; i < 800; ++i) {
                hash += wave[(i+state.index) % wave.length]
            }

            var currentMouseX = window.mouseX;
            if (currentMouseX > state.prevMouseX) {
                state.right = true;
            } else if (currentMouseX < state.prevMouseX) {
                state.right = false;
            } else {
                state.right = state.right
            }
            if (state.right) {
                setHash(hash.split("").reverse().join(""), 'wave');
                state.right = true
            } else {
                setHash(hash, 'wave');
                state.right = false;
            }
            state.index = (state.index == wave.length-1) ? 0 : state.index+1 
            state.prevMouseX = currentMouseX;
        },
        wave2: function(now, state) {
            var wave = ['\u4DEB', '\u4DCC', '\u4DC9', '\u4DC8', '\u4DCD',
                        '\u4DC8', '\u4DC9', '\u4DCC']
            // var wave = ['\u4DEB', '\u4DCC', '\u4DC9', '\u4DC8', '\u4DCD']
            var hash = ''
            for (var i=0; i < 800; ++i) {
                hash += wave[(i+state.index) % wave.length]
            }

            var currentMouseX = window.mouseX;
            if (currentMouseX > state.prevMouseX) {
                state.right = true;
            } else if (currentMouseX < state.prevMouseX) {
                state.right = false;
            } else {
                state.right = state.right
            }
            if (state.right) {
                setHash(hash.split("").reverse().join(""), 'wave2')
                state.right = true
            } else {
                setHash(hash, 'wave2')
                state.right = false;
            }
            state.index = (state.index == wave.length-1) ? 0 : state.index+1 
            state.prevMouseX = currentMouseX;
        },
        bounce: function(now, state) {
            var wave = ['\u00B8', '.', '\u00B7', '\u00B4', '`', '\u00B7', '.']
            var length = 29
            
            var hash = ''
            for (var i=0; i < length; ++i) {
                if (i == length-1) {
                    hash += '#'
                } else if (i == state.position) {
                    hash += wave[i % wave.length]
                } else {
                    hash += ' '
                }
            }
            
            if (state.position >= length-1) {
                state.right = false;
            } else if (state.position <= 0){
                state.right = true
            }
            state.position += state.right ? 1 : -1

            setHash(hash, 'bounce')
        },
        listen: function(now, state) {
            if (!state.hasSetup && !state.isSettingUp) {
                state.isSettingUp = true;
                navigator.getUserMedia_({video: false, audio: true}, function(stream) {
                    state.microphone = state.context.createMediaStreamSource(stream);

                    var analyser = state.context.createAnalyser();
                    analyser.smoothingTimeConstant = 0.2;
                    analyser.fftSize = 1024;
                    state.microphone.connect(analyser)
                    

                    // why is this api so fucking stupid
                    var javascriptNode = state.context.createScriptProcessor(2048, 1, 1);
                    javascriptNode.onaudioprocess = function() {
                        var arr =  new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(arr);
                        state.volume = average(arr)
                    }
                    analyser.connect(javascriptNode)
                    

                    state.hasSetup = true
                }, function() {
                    alert('allow the microphone or open in firefox/chrome')
                })
            } else if (state.hasSetup) {
                var numberOfThings = Math.round(state.volume*2);
                var hash = ''
                for (var i = 0; i < numberOfThings; ++i) {
                    hash += '#'
                }
                setHash(hash, 'listen')
            }
        },
        diy: function(now, state) {
            var $diy = $('#diy');
            var input = $diy.find('input[type="range"]').val();
            var frameRate = 1000 - input;

            if (now - state.past > frameRate) {
                var frames = $diy.find('textarea').val().split('\n');

                if (state.index > frames.length - 1) {
                    state.index = 0;
                }

                setHash(frames[state.index], 'diy');

                state.index += 1;
                state.past = now;

                var share = encodeURI('diy.' + input + '.' + frames.join('\\n'))
                var shareUrl = window.location.href.split('#')[0] + '#' + share
                var $share = $('input[type="text"]')
                if ($share.val() !== shareUrl) {
                    $share.val(shareUrl)
                }
            }
        },
        pewpew: function(now, state) {
            var ships = ['\u00B8', '.', '\u00B7', '\u00B4']
            var star = "\u2606";
            var ship = ships[state.shipIndex];

            if (window.up) {
                state.shipIndex += state.shipIndex == ships.length-1 ? 0 : 1
                window.up = false;
            } 
            if (window.down) {
                state.shipIndex -= state.shipIndex == 0 ? 0 : 1 
                window.down = false;
            } 
            if (window.space) {
                // fire!
                state.bullets = [ship].concat(state.bullets).slice(0, 200)
                window.space = false;
            } else {
                state.bullets = [' '].concat(state.bullets).slice(0,200)
            }

            if (Math.random() > .95) {
                var rand = ships[Math.floor(Math.random() * ships.length)]
                state.enemies.push(rand)
            } else {
                state.enemies.push(' ')
            }
            state.enemies.reverse()
            state.enemies = state.enemies.slice(0, 200)
            state.enemies.reverse()

            var score = ' score: '+state.score+ ' # '
            var hash = state.dead ? (score+star) : (score+ship+ship)
            if (state.dead) { state.dead = false }
            for (var i=0; i < 200; ++i) {
                var bullet = state.bullets[i] || ' '
                var enemy = state.enemies[i] || ' '
                if (i == 0 && enemy == ship) {
                    state.score = 0
                    state.dead = true;
                }
                if (bullet == enemy && bullet != ' ') {
                    hash += star
                    state.bullets[i] = ' '
                    state.enemies[i] = ' '
                    state.score += 1
                } else if (enemy != ' ') {
                    hash += enemy
                } else if (bullet != ' ') {
                    hash += bullet
                } else {
                    hash += ' '
                }
            }

            setHash(hash, 'pewpew')
        }
    };


    setTimeout(tick, 50)

