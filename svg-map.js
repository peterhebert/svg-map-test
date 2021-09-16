window.addEventListener('load', function () {

    const countyLinks = document.querySelectorAll('#countyLinks a');

    // add listener to county links on focus/blur and mouse enter/leave
    for (var i = 0; i < countyLinks.length; i++) {
      countyLinks[i].addEventListener('mouseenter', activateCountyEnterLink, false);
      countyLinks[i].addEventListener('focus', activateCountyEnterLink, false);

      countyLinks[i].addEventListener('mouseleave', deactivateCountyExitLink, false);
      countyLinks[i].addEventListener('blur', deactivateCountyExitLink, false);
    }

    function activateCountyEnterLink() {

      var myID = this.getAttribute('id');
      var label = '';
      var countyID = false;
      var linkID = false;

      if (myID.startsWith("link_")) {
        label = this.innerText;
        countyID = this.getAttribute('data-county');
        linkID = this.getAttribute('id');
      } else {
        label = this.getAttribute('data-label');
        countyID = this.getAttribute('id');
        linkID = `link_${countyID}`;
      }

      const link = document.getElementById(linkID),
      countyMap = document.getElementById(countyID);

      if (link && countyMap) {
        const infoBox = document.getElementById('info-box');
        countyDims = countyMap.getBoundingClientRect();

        var label = link.innerText;
        var countyURL = link.getAttribute('href');
        infoBox.innerHTML = `<a href="${countyURL}" target="_blank">${label}</a>`;

        link.classList.add('active');

        countyMap.setAttribute("class", "county active");     

        newX = countyDims.x + (countyDims.width / 2) - (infoBox.offsetWidth / 2);
        newY = countyDims.y + (countyDims.height / 2) - (infoBox.offsetHeight / 2);

        infoBox.style.left = newX + 'px';
        infoBox.style.top = newY + 'px';
        infoBox.style.display = 'block';
      }

    }

    function deactivateCountyExitLink() {
      var myID = this.getAttribute('id');
      var label = '';
      var countyID = false;
      var linkID = false;

      if (myID.startsWith("link_")) {
        label = this.innerText;
        countyID = this.getAttribute('data-county');
        linkID = this.getAttribute('id');
      } else {
        label = this.getAttribute('data-label');
        countyID = this.getAttribute('id');
        linkID = `link_${countyID}`;
      }

      const link = document.getElementById(linkID),
      countyMap = document.getElementById(countyID);

      const infoBox = document.getElementById('info-box');

      infoBox.style.display = 'none';
      infoBox.innerHTML = '';

      if(countyMap && link) {
        countyMap.setAttribute("class", "county");     
        link.classList.remove('active');
      }

    }

    // county path listeners
    var county = document.querySelectorAll('.county[data-enabled]');

    for (var i = 0; i < county.length; i++) {
      // mousemove
      // county[i].addEventListener('mousemove', moveInfoBox, false);

      // add listener to counties on mouseover
      county[i].addEventListener('mouseenter', showTextLabel, false);
      county[i].addEventListener('mouseleave', hideTextLabel, false);
    }

    function moveInfoBox( event ) {
      const infoBox = document.getElementById('info-box');

      position = calculateInfoBoxPosition(this);

      infoBox.style.posiiton = 'absolute';
      infoBox.style.left = position.x;
      infoBox.style.top = position.y;

      // console.log(position);
      console.log(infoBox.offsetLeft);
      console.log(infoBox.offsetTop);

    }

    function showTextLabel() {

      var infoBox = document.getElementById('info-box');

      const mapID = this.getAttribute('id');
      const linkID = `link_${mapID}`;

      const county = document.getElementById(mapID);
      mapContainer = document.getElementById('mapContainer');
      console.log('map container:');
      console.log('left:' + mapContainer.offsetLeft);
      console.log('top:' + mapContainer.offsetTop);

      position = calculateInfoBoxPosition(county);
      
      infoBox.style.display = 'block';
      
      infoBox.style.left = `${position.x}px`;
      infoBox.style.top = `${position.y}px` ;

      const link = document.getElementById(linkID);
      if(link) {

        // add `active` class on county path and link
        this.setAttribute('class', 'county active');
        link.classList.add('active');
        
        // update infobox contents with link to county page
        var label = link.innerText;
        var countyURL = link.getAttribute('href');
        infoBox.innerHTML = `<a href="${countyURL}" target="_blank">${label}</a>`;

      }

    }

    function hideTextLabel() {

      const infoBox = document.getElementById('info-box');
      infoBox.style.display = 'none';

      infoBox.innerText = '';

      // remove `active` class on county path
      this.setAttribute('class', 'county');

      var mapID = this.getAttribute('id');
      var linkID = `link_${mapID}`;

      var link = document.getElementById(linkID);
      if(link) {
        // remove `active` class on link
        link.classList.remove('active');
      }
    }

    function calculateInfoBoxPosition(county) {
      var coordinates = {
        x: 0,
        y: 0,
      };
      const infoBox = document.getElementById('info-box');
      var countyDims = county.getBoundingClientRect();
      var infoBoxDims = county.getBoundingClientRect();

      coordinates.x = countyDims.left + (countyDims.width /2) - (infoBoxDims.width / 2);
      coordinates.y = countyDims.top + (countyDims.height / 2) - (infoBoxDims.height / 2);
      
      return coordinates;
    }

  });
