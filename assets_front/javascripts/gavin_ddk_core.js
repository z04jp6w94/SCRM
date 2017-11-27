function callddkUIComponent1(obj, firstText, secondText) {
    $('html, body').stop().animate({scrollTop: obj.offset().top - 50}, '500', 'swing', function () {});
    ddkUIComponent('Simple Alert',
            {
                action: 'appear',
                replaced: false,
                firstText: {text: firstText, style: 'color:#d21414;font-weight:bold;'},
                secondText: {text: secondText, style: 'font-weight:bold;'},
                doneLabel: '確認',
                afterDone: function () {
                    //console.log('CLICK events' + ' >> afterDone');
                },
                events: {
                    beforeAppear: function () {
                        //console.log('EVENT events.' + ' >> beforeAppear');
                    },
                    afterAppear: function () {
                        //console.log('EVENT events.' + ' >> afterAppear');
                    },
                    beforeRemove: function () {
                        //console.log('EVENT events.' + ' >> beforeRemove');
                    },
                    afterRemove: function () {
                        obj.focus();
                        //console.log('EVENT events.' + ' >> afterRemove');
                    }
                }
            }
    );
}
function callddkUIComponent2(firstText, secondText, second) {
    ddkUIComponent('Please Wait',
            {
                action: 'appear',
                replaced: false,
                firstText: {text: firstText, style: 'color:#d21414;font-weight:bold;'},
                secondText: {text: secondText, style: 'font-weight:bold;'},
                events: {
                    beforeAppear: function () {
                        //console.log('EVENT events.' + ' >> beforeAppear');
                    }
                    ,
                    afterAppear: function () {
                        //console.log('EVENT events.' + ' >> afterAppear');
                    }
                    ,
                    beforeRemove: function () {
                        //console.log('EVENT events.' + ' >> beforeRemove');
                    }
                    ,
                    afterRemove: function () {
                        //console.log('EVENT events.' + ' >> afterRemove');
                    }
                }
            }
    );
    /*假設在n秒後移除*/
    setTimeout(function () {
        ddkUIComponent('Please Wait', {action: 'remove'})
    }, second * 1000);
}
function callddkUIComponent3(firstText, secondText, second, url) {
    ddkUIComponent('Please Wait',
            {
                action: 'appear',
                replaced: false,
                firstText: {text: firstText, style: 'color:#d21414;font-weight:bold;'},
                secondText: {text: secondText, style: 'font-weight:bold;'},
                events: {
                    beforeAppear: function () {
                        //console.log('EVENT events.' + ' >> beforeAppear');
                    }
                    ,
                    afterAppear: function () {
                        //console.log('EVENT events.' + ' >> afterAppear');
                    }
                    ,
                    beforeRemove: function () {
                        //console.log('EVENT events.' + ' >> beforeRemove');
                    }
                    ,
                    afterRemove: function () {
                        //console.log('EVENT events.' + ' >> afterRemove');
                        window.location.href = url;
                    }
                }
            }
    );
    /*假設在n秒後移除*/
    setTimeout(function () {
        ddkUIComponent('Please Wait', {action: 'remove'})
    }, second * 1000);
}
function callddkUIComponent4(firstText, secondText, url) {
    ddkUIComponent('Simple Alert',
            {
                action: 'appear',
                replaced: false,
                firstText: {text: firstText, style: 'color:#d21414;font-weight:bold;'},
                secondText: {text: secondText, style: 'font-weight:bold;'},
                doneLabel: '確認',
                afterDone: function () {
                    //console.log('CLICK events' + ' >> afterDone');
                },
                events: {
                    beforeAppear: function () {
                        //console.log('EVENT events.' + ' >> beforeAppear');
                    },
                    afterAppear: function () {
                        //console.log('EVENT events.' + ' >> afterAppear');
                    },
                    beforeRemove: function () {
                        //console.log('EVENT events.' + ' >> beforeRemove');
                    },
                    afterRemove: function () {
                        //console.log('EVENT events.' + ' >> afterRemove');
                        window.location.href = url;
                    }
                }
            }
    );
}
function callddkUIComponent5(firstText, secondText) {
    ddkUIComponent('Simple Alert',
            {
                action: 'appear',
                replaced: false,
                firstText: {text: firstText, style: 'color:#d21414;font-weight:bold;'},
                secondText: {text: secondText, style: 'font-weight:bold;'},
                doneLabel: '確認',
                afterDone: function () {
                    //console.log('CLICK events' + ' >> afterDone');
                },
                events: {
                    beforeAppear: function () {
                        //console.log('EVENT events.' + ' >> beforeAppear');
                    },
                    afterAppear: function () {
                        //console.log('EVENT events.' + ' >> afterAppear');
                    },
                    beforeRemove: function () {
                        //console.log('EVENT events.' + ' >> beforeRemove');
                    },
                    afterRemove: function () {
                        //console.log('EVENT events.' + ' >> afterRemove');
                    }
                }
            }
    );
}
function callddkUIComponent6(firstText, secondText, url) {
    ddkUIComponent('Simple Confirm',
            {
                action: 'appear',
                replaced: false,
                firstText: {text: firstText, style: 'color:#d21414;font-weight:bold;'},
                secondText: {text: secondText, style: 'font-weight:bold;'},
                doneLabel: '是',
                deniedLabel: '否',
                afterDone: function () {
                    //console.log('CLICK events' + ' >> afterDone');
                    window.location.href = url;
                },
                afterDenied: function () {
                    //console.log('CLICK EVENT events.' + ' >> afterDenied');
                },
                events: {
                    beforeAppear: function () {
                        //console.log('EVENT events.' + ' >> beforeAppear');
                    },
                    afterAppear: function () {
                        //console.log('EVENT events.' + ' >> afterAppear');
                    },
                    beforeRemove: function () {
                        //console.log('EVENT events.' + ' >> beforeRemove');
                    },
                    afterRemove: function () {
                        //console.log('EVENT events.' + ' >> afterRemove');
                    }
                }
            }
    );
}