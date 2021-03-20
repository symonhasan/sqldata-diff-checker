$(document).ready(function (){
    var diffRow = $('#diff-row');
    var sourceTextArea = $('#source-textarea');
    var modifiedTextArea = $('#modified-textarea');
    var sourceDiff = $('#source-diff');
    var modifiedDiff = $('#modified-diff');
    var totalDiff = $('#total-diff');
    var totalDiffText = $('#total-diff #msg');
    totalDiff.hide();
    diffRow.hide();

    var sourceText = "";
    var modifiedText = "";
    
    sourceTextArea.change(function( e ) {
        sourceText = e.target.value;
        if(modifiedText !== ""){
            triggerDiff();
        }
    });

    modifiedTextArea.change(function( e ) {
        modifiedText = e.target.value;
        triggerDiff();
    });

    function triggerDiff() {
        totalDiff.show();
        diffRow.show();
        var sourceArr = sourceText.split('\n');
        var modifiedArr = modifiedText.split('\n');
        sourceArr.sort();
        modifiedArr.sort();
        
        var sourceMark = new Array( sourceArr.length );
        var modifiedMark = new Array( modifiedArr.length );
        sourceMark.fill(0);
        modifiedMark.fill(0);
        var sourceResult = [];
        var modifiedResult = [];
        
        sourceArr.forEach(function(e , idx){
            var flag = false;
            modifiedArr.forEach(function(el , indx){
                if(sourceMark[idx] === 0 && e === el && modifiedMark[indx] === 0)
                {
                    sourceResult.push(e);
                    sourceMark[ idx ] = 1;
                    modifiedResult.push(el);
                    modifiedMark[ indx ] = 1;
                    flag = true;
                }
            });
            if( !flag )
            {
                sourceResult.push(e);
                modifiedResult.push("");
            }
        });

        modifiedMark.forEach(function(el, idx){
            if( el === 0){
                modifiedResult.push( modifiedArr[idx] );
            }
        });

        sourceDiff.html("");
        sourceResult.forEach(function(e, idx){
            var p = $('<div></div>').text(e);
            if(modifiedResult[idx] === ""){
                p.addClass('diff-green');
            }
            sourceDiff.append( p );
        });

        modifiedDiff.html("");
        modifiedResult.forEach(function(e,idx){
            var p = $('<div></div>').text(e);
            if(e === ""){
                p.addClass('diff-red');
            }
            if(sourceResult[idx] === undefined){
                p.addClass('diff-green');
                sourceDiff.append('<div class="diff-red"></div>');
            }
            modifiedDiff.append(p);
        });

        var diffCount = $('.diff-red').length;
        if( diffCount !== 0){
            totalDiffText.text(`Total Difference Found ${diffCount}`);
        } else {
            totalDiffText.text("No Difference Found");
        }
    }

    var year = new Date().getFullYear();
    $('#date').text(year);

    $('.navigation__title').click(function(){
        totalDiff.hide();
        diffRow.hide();
        sourceTextArea.val("");
        modifiedTextArea.val("");
        sourceText = "";
        modifiedText = "";
    });

});