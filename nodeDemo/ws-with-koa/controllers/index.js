'use strict';
module.exports = {
    'GET /': async (ctx, next) => {
        let user = ctx.state.user;
        console.log(user);
        if (user) {
            ctx.render('room.html', {
                user: user
            });
        } else {
            ctx.response.redirect('/signin');
        }
    }
};