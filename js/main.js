var App = {

  //
  // Инициализация
  // -------------------
  Init: function() {
    $(document).ready(function() {
      
      App.Func.slider();                     // Слайдер новостей
      App.Func.video_collection_select();    // Выбор видео
      App.Func.video_collection_width();     // Автоматическое выставление ширины видео коллекции
      App.Func.form_valid();                 // Валидация формы
      App.Func.form_send('#form');           // Функция отпраки формы

    })
  },


  //
  // Функции
  // -------------------
  Func: {

    video_collection_width: function() {

      var $video_item = $('.video_item'),
          full_width = 0;

      $video_item.each(function(index, el) {

        full_width = full_width + parseInt( $(el).css('margin-left') ) + parseInt( $(el).css('margin-right') ) + parseInt( $(el).width() );

      });

      $('.video_collection_list').width(full_width);

    }, // <<<--- / video_collection_width

    video_collection_select: function() {

      var $video_item = $('.video_item');

      $video_item.click(function(event) {
        $('#video_player').attr('src', $(this).data('url'));
        $video_item.removeClass('active');
        $(this).addClass('active');
      });

    }, // <<<--- / video_collection_select

    slider: function() {
      
      var $slides_node = $('.slides'),
          $slides_arr = $('.slide'),
          count = $slides_arr.size(),                         // кол-во слайдов
          idx = 1,                                            // счетчик слайдов
          slider_delay = 5000,                                // заджержка
          timer,                                              // указатель на таймер
          $control = $('.control_nav').find('li'),            // выбор слайда
          idx_control,                                        // внутрений счетчик для выбора слайда
          $dir = $('.direction_nav').find('li'),              // следующий / предыдущий слайд
          idx_dir,                                            // внутрений счетчик
          idx_active;

      var timer = setTimeout(slide, slider_delay);

      // обработка выбора слайда
      $control.click(function(event) {
        $control.removeClass('active');
        $(this).addClass('active');
        idx_control = $(this).index();
        
        clearTimeout(timer);
        slide(idx_control);
      });

      // обработка кликов вперед / назад
      $dir.click(function(event) {
        idx_active = $slides_node.children('.active').index();
        if( $(this).hasClass('next') ) {
          ++idx_active >= count ? idx_dir = 0 : idx_dir = idx_active;
        }
        if( $(this).hasClass('before') ) {
          --idx_active < 0 ? idx_dir = count - 1 : idx_dir = idx_active;
        }

        clearTimeout(timer);
        slide(idx_dir);
      });

      function slide(set_idx) {
        set_idx ? idx = set_idx : false;
        $slides_arr.removeClass('active');
        $control.removeClass('active');
        idx >= count ? idx = 0 : false;    
        $($control[idx]).addClass('active');
        $($slides_arr[idx++]).addClass('active');
        
        clearTimeout(timer);
        timer = setTimeout(slide, slider_delay);
      }

    }, // <<<--- / slider news

    form_valid: function() {

      jQuery.validator.addMethod("phone", function(value, element) {
        return this.optional(element) || /^[0-9\s+\(\)-]+$/.test(value);
      },  "Только цифры и пробелы");

      $('#form').validate(
      {
        rules: {

          tel: {
            required: true,
            minlength: 6,
            phone: true
          },
          name: {
            required: true,
            minlength: 2,
          },
          message: {
            required: true,
          }

        },
        messages: {

          tel: {
            required: 'Укажите телефон',
            minlength: 'Слишком короткий'
          },
          name: {
            required: 'Укажите ваше имя',
            minlength: 'Имя слишком короткое'
          },
          message: {
            required: 'Напишите сообщение'
          }

        },
        errorElement : 'div'
      });
    }, // <<<--- / form_valid

    form_send : function(form_id) {
      $('body').on('submit', form_id, function(event) {
        event.preventDefault();
        var thisForm = this;
        var dataSend = $(this).serialize();
        var form_action = 'mail.php';  
        var $inputs = $(thisForm).find('.form_control');

        if($(thisForm).find('input.error').length <= 0) {
          $.ajax({  
            type: "POST",
            url: form_action,
            data: dataSend,
            dataType: "json",
            beforeSend : function(){
              $(thisForm).find('input,button').attr('disabled', 'true');
            },
            complete : function(){
              $(thisForm).find('input,button').removeAttr('disabled');
            }
          })  
              .done(function(answer) {
              $(thisForm).prepend('<p class="form_answer __success">' + answer.title + '<br/>' + answer.desc + '</p>');
              $inputs.val('');
          })
              .always(function(answer) {
              $(thisForm).find('.form_answer').fadeOut(10000, function() {
                $(this).remove();
              });

          })  .fail(function() {
              $(thisForm).prepend('<p class="form_answer __error">' + answer.title + '<br/>' + answer.desc + '</p>');
          });
        }     
      });
    },  // <<<--- / form_send

  }

}

App.Init();