function Interface(){}

Interface.initialize = function()
{	
	//File directory
	Interface.file_dir = "editor/files/";

	//Style
	Interface.theme = new Style();
	Interface.theme.setStyleSheet(Interface.file_dir + "css/dark.css");

	//------------------------------------Tab Container-------------------------------
	Interface.tab = new TabContainer();
	Interface.tab.addOption("Scene", Interface.file_dir + "icons/scene.png", false);
	Interface.tab.addOption("Settings", Interface.file_dir + "icons/settings.png", true);
	Interface.tab.addOption("Script", Interface.file_dir + "icons/code.png", true);

	//Canvas
	Interface.canvas = new Canvas();
	Interface.tab.options[0].attachComponent(Interface.canvas);
	
	//Dual Div
	Interface.dual_test = new DualDivisionResizable();
	Interface.dual_test.orientation = DualDivisionResizable.HORIZONTAL;
	Interface.dual_test.tab_position = 250;
	Interface.dual_test.div_a.className = "bar";
	Interface.tab.options[1].attachComponent(Interface.dual_test);

	//---------------------------------Asset Manager----------------------------------
	Interface.asset_explorer = new DivisionResizable();
	Interface.asset_explorer.resizable_side = DivisionResizable.TOP;
	Interface.asset_explorer.size.y = 150;
	Interface.asset_explorer.updateInterface();

	Interface.asset_explorer_bar = new Division(Interface.asset_explorer.element);
	Interface.asset_explorer.position.set(0, 0);
	Interface.asset_explorer_bar.size.y = 20;
	Interface.asset_explorer_bar.element.className = "bar";
	Interface.asset_explorer_bar.updateInterface();

	//------------------------------------Explorer------------------------------------
	Interface.explorer = new DivisionResizable();
	Interface.explorer.size.x = 300;

	Interface.explorer_resizable = new DualDivisionResizable(Interface.explorer.element);
	Interface.explorer_resizable.orientation = DualDivisionResizable.VERTICAL;
	Interface.explorer_resizable.tab_position = 400;
	Interface.explorer_resizable.position.set(0, 0);

	//------------------------------------Tool Bar------------------------------------
	Interface.tool_bar = new Division();
	Interface.tool_bar.size.x = 40;
	Interface.tool_bar.element.className = "bar";

	//Tools text
	Interface.tool_text = new Text(Interface.tool_bar.element);
	Interface.tool_text.text = "Tools";
	Interface.tool_text.position.set(Interface.tool_bar.size.x/2, 40);
	Interface.tool_text.updateInterface();

	//Select
	Interface.tool_select = new ButtonImageToggle();
	Interface.tool_select.selected = true;
	Interface.tool_select.setImage(Interface.file_dir + "icons/tools/select.png");
	Interface.tool_select.image_scale.set(0.7, 0.7);
	Interface.tool_select.size.set(Interface.tool_bar.size.x, Interface.tool_bar.size.x);
	Interface.tool_select.position.set(0, 80);
	Interface.tool_select.updateInterface();
	Interface.tool_select.setCallback(function()
	{
		Editor.tool_mode = Editor.MODE_SELECT;
		Interface.tool_select.selected = true;
		Interface.tool_move.selected = false;
		Interface.tool_resize.selected = false;
		Interface.tool_rotate.selected = false;
		Interface.tool_rotate.updateInterface();
		Interface.tool_move.updateInterface();
		Interface.tool_resize.updateInterface();
		Interface.tool_select.updateInterface();
	});

	//Move
	Interface.tool_move = new ButtonImageToggle();
	Interface.tool_move.setImage(Interface.file_dir + "icons/tools/move.png");
	Interface.tool_move.image_scale.set(0.7, 0.7);
	Interface.tool_move.size.set(Interface.tool_bar.size.x, Interface.tool_bar.size.x);
	Interface.tool_move.position.set(0, 120);
	Interface.tool_move.updateInterface();
	Interface.tool_move.setCallback(function()
	{
		Editor.tool_mode = Editor.MODE_MOVE;
		Interface.tool_move.selected = true;
		Interface.tool_select.selected = false;
		Interface.tool_resize.selected = false;
		Interface.tool_rotate.selected = false;
		Interface.tool_rotate.updateInterface();
		Interface.tool_move.updateInterface();
		Interface.tool_resize.updateInterface();
		Interface.tool_select.updateInterface();
	});

	//Resize
	Interface.tool_resize = new ButtonImageToggle();
	Interface.tool_resize.setImage(Interface.file_dir + "icons/tools/resize.png");
	Interface.tool_resize.image_scale.set(0.7, 0.7);
	Interface.tool_resize.size.set(Interface.tool_bar.size.x, Interface.tool_bar.size.x);
	Interface.tool_resize.position.set(0, 160);
	Interface.tool_resize.updateInterface();
	Interface.tool_resize.setCallback(function()
	{
		Editor.tool_mode = Editor.MODE_RESIZE;
		Interface.tool_resize.selected = true;
		Interface.tool_move.selected = false;
		Interface.tool_select.selected = false;
		Interface.tool_rotate.selected = false;
		Interface.tool_rotate.updateInterface();
		Interface.tool_move.updateInterface();
		Interface.tool_resize.updateInterface();
		Interface.tool_select.updateInterface();
	});

	//Rotate
	Interface.tool_rotate = new ButtonImageToggle();
	Interface.tool_rotate.setImage(Interface.file_dir + "icons/tools/rotate.png");
	Interface.tool_rotate.image_scale.set(0.7, 0.7);
	Interface.tool_rotate.size.set(Interface.tool_bar.size.x, Interface.tool_bar.size.x);
	Interface.tool_rotate.position.set(0, 200);
	Interface.tool_rotate.updateInterface();
	Interface.tool_rotate.setCallback(function()
	{
		Editor.tool_mode = Editor.MODE_ROTATE;
		Interface.tool_rotate.selected = true;
		Interface.tool_move.selected = false;
		Interface.tool_resize.selected = false;
		Interface.tool_select.selected = false;
		Interface.tool_rotate.updateInterface();
		Interface.tool_move.updateInterface();
		Interface.tool_resize.updateInterface();
		Interface.tool_select.updateInterface();
	});
 
	//Add Text
	Interface.add_text = new Text(Interface.tool_bar.element);
	Interface.add_text.text = "Add";
	Interface.add_text.position.set(Interface.tool_bar.size.x/2, 240);
	Interface.add_text.updateInterface();

	//Add Models
	Interface.add_model = new ButtonDrawer();
	Interface.add_model.setImage(Interface.file_dir + "icons/models/models.png");
	Interface.add_model.image_scale.set(0.7, 0.7);
	Interface.add_model.options_scale.set(0.7, 0.7);
	Interface.add_model.size.set(Interface.tool_bar.size.x, Interface.tool_bar.size.x);
	Interface.add_model.position.set(0, 280);
	Interface.add_model.options_size.set(40, 40);
	Interface.add_model.updateInterface();

	Interface.add_model.addOption(Interface.file_dir + "icons/models/cube.png", function()
	{
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshPhongMaterial();
		var model = new Model3D(geometry, material);
		Editor.addToActualScene(model);
	});

	Interface.add_model.addOption(Interface.file_dir + "icons/models/cylinder.png", function()
	{
		var geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
		var material = new THREE.MeshPhongMaterial();
		var model = new Model3D(geometry, material);
		Editor.addToActualScene(model);
	});

	Interface.add_model.addOption(Interface.file_dir + "icons/models/sphere.png", function()
	{
		var geometry = new THREE.SphereGeometry(0.6, 16, 16);
		var material = new THREE.MeshPhongMaterial();
		var sphere = new Model3D(geometry, material);
		Editor.addToActualScene(sphere);
	});

	Interface.add_model.addOption(Interface.file_dir + "icons/models/torus.png", function()
	{
		var geometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
		var material = new THREE.MeshPhongMaterial();
		var model = new Model3D(geometry, material);
		Editor.addToActualScene(model);
	});

	Interface.add_model.addOption(Interface.file_dir + "icons/models/pyramid.png", function()
	{
		var geometry = new THREE.CylinderGeometry(0, 1, 2, 32);
		var material = new THREE.MeshPhongMaterial();
		var model = new Model3D(geometry, material);
		Editor.addToActualScene(model);
	});

	//Add lights
	Interface.add_light = new ButtonDrawer();
	Interface.add_light.setImage(Interface.file_dir + "icons/lights/point.png");
	Interface.add_light.image_scale.set(0.7, 0.7);
	Interface.add_light.options_scale.set(0.7, 0.7);
	Interface.add_light.size.set(Interface.tool_bar.size.x, Interface.tool_bar.size.x);
	Interface.add_light.position.set(0, 320);
	Interface.add_light.options_size.set(40, 40);
	Interface.add_light.updateInterface();

	//Point Light
	Interface.add_light.addOption(Interface.file_dir + "icons/lights/point.png", function()
	{
		Editor.addToActualScene(new PointLight());
	});

	//Ambient Light
	Interface.add_light.addOption(Interface.file_dir + "icons/lights/ambient.png", function()
	{
		Editor.addToActualScene(new AmbientLight());
	});

	//Spot Light
	Interface.add_light.addOption(Interface.file_dir + "icons/lights/spot.png", function()
	{
		Editor.addToActualScene(new SpotLight());
	});

	//Directional Light
	Interface.add_light.addOption(Interface.file_dir + "icons/lights/directional.png", function()
	{
		Editor.addToActualScene(new DirectionalLight());
	});

	//----------------------------------Menu Top Bar----------------------------------
	Interface.top_bar = new Division();
	Interface.top_bar.size.y = 25 ;
	Interface.top_bar.element.className = "bar";

	//Editor Logo
	Interface.image = new Image();
	Interface.image.setImage("data/logo.png");
	Interface.image.size.set(120, 15);
	Interface.image.updateInterface();

	//File
	Interface.file = new DropdownMenu();
	Interface.file.text = "File";
	Interface.file.size.set(150, Interface.top_bar.size.y);
	Interface.file.position.set(0,0);

	Interface.file.addOption("New Project", function()
	{
		//TODO <CONFIRM ACTION>
		Editor.createNewProgram();
	});

	Interface.file.addOption("Save Project", function()
	{
		//TODO <SAVE PROJECT>
	});

	Interface.file.addOption("Load Project", function()
	{
		//TODO <LOAD PROJECT>
	});

	Interface.file.addOption("Exit", function()
	{
		//TODO <NEW PROJECT>
	});

	//Editor
	Interface.editor = new DropdownMenu();
	Interface.editor.text = "Editor";
	Interface.editor.size.set(150, Interface.top_bar.size.y);
	Interface.editor.position.set(150,0);
	Interface.editor.addOption("Undo", function()
	{
		//TODO <UNDO>
	});

	Interface.editor.addOption("Redo", function()
	{
		//TODO <REDO>
	});

	//About
	Interface.about = new Button();
	Interface.about.text = "Run";
	Interface.about.size.set(150, Interface.top_bar.size.y);
	Interface.about.position.set(300, 0);
	Interface.about.updateInterface();
	Interface.about.setCallback(function()
	{
		//TODO <ADD CODE HERE>
		if(Editor.state === Editor.STATE_EDITING)
		{
			Interface.about.setText("Stop");
			Editor.state = Editor.STATE_TESTING;
		}
		else if(Editor.state === Editor.STATE_TESTING)
		{
			Interface.about.setText("Run");
			Editor.state = Editor.STATE_EDITING;
		}
	});
}

Interface.update = function()
{
	Interface.explorer.update();
	Interface.asset_explorer.update();
	Interface.dual_test.update();
	Interface.explorer_resizable.update();
}

Interface.updateInterface = function()
{
	//Window size
	var size = new THREE.Vector2(window.innerWidth, window.innerHeight);

	//----------------------------------Menu Top Bar----------------------------------
	Interface.top_bar.size.x = size.x;
	Interface.top_bar.updateInterface();

	//Logo
	Interface.image.position.set(size.x - Interface.image.size.x, 5);
	Interface.image.updateInterface();

	//------------------------------------Tool Bar------------------------------------
	Interface.tool_bar.position.set(0, Interface.top_bar.size.y);
	Interface.tool_bar.size.y = size.y - Interface.top_bar.size.y;
	Interface.tool_bar.updateInterface();

	//------------------------------------Explorer------------------------------------
	Interface.explorer.size.y = (size.y - Interface.top_bar.size.y);
	Interface.explorer.position.set(size.x - Interface.explorer.size.x, Interface.top_bar.size.y);
	Interface.explorer.updateInterface();

	Interface.explorer_resizable.size.set(Interface.explorer.size.x - Interface.explorer.resize_tab_size, Interface.explorer.size.y);
	Interface.explorer_resizable.updateInterface();

	//---------------------------------Asset Manager----------------------------------
	Interface.asset_explorer.size.x = size.x - Interface.explorer.size.x - Interface.tool_bar.size.x;
	Interface.asset_explorer.position.set(Interface.tool_bar.size.x, size.y - Interface.asset_explorer.size.y);
	Interface.asset_explorer.updateInterface();

	Interface.asset_explorer_bar.size.x = Interface.asset_explorer.size.x;
	Interface.asset_explorer_bar.updateInterface();

	//------------------------------------Tab Container-------------------------------
	Interface.tab.position.set(Interface.tool_bar.size.x, Interface.top_bar.size.y);
	Interface.tab.size.x = (size.x - Interface.tool_bar.size.x - Interface.explorer.size.x);
	Interface.tab.size.y = (size.y - Interface.top_bar.size.y - Interface.asset_explorer.size.y); 
	Interface.tab.updateInterface();

	//Resize editor camera
	Editor.resizeCamera();
}