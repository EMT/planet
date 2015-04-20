<?php

namespace app\controllers;

use app\models\Tasks;
use lithium\action\DispatchException;

class TasksController extends \lithium\action\Controller {

	public function index() {
		$tasks = Tasks::all();
		return compact('tasks');
	}

	public function view() {
		$task = Tasks::first($this->request->id);
		// return compact('task');

		return $this->render(array('json' => $data = array(), 'status'=> 200));
	}

	public function add() {

		// if ($this->request->data) {
		// 		return $this->request->data['task']['completed'];
		// }

		$task = Tasks::create();

		$task->save(array('id' => $this->request->data['task']['id'], 'content' => $this->request->data['task']['content'], 'status' => $this->request->data['task']['status'], 'project' => $this->request->data['task']['project']));

		// return $this->request->data['tasks'];

		if (($this->request->data) && $task->save($this->request->data)) {
			// return $this->redirect(array('Tasks::view', 'args' => array($task->id)));
		}
		return compact('task');
	}

	public function edit() {
		$task = Tasks::find($this->request->id);

		if (!$task) {
			return $this->redirect('Tasks::index');
		}
		if (($this->request->data) && $task->save($this->request->data)) {
			return $this->redirect(array('Tasks::view', 'args' => array($task->id)));
		}
		return compact('task');
	}

	public function delete() {
		// if (!$this->request->is('post') && !$this->request->is('delete')) {
		// 	$msg = "Tasks::delete can only be called with http:post or http:delete.";
		// 	throw new DispatchException($msg);
		// }

		// return $this->request->data;

		if ( $this->request->data['task']['delete'] == "true") {
			Tasks::find( $this->request->data['task']['id'])->delete();
		}

		// Tasks::find( $this->request->data['task']['id'])->delete();
		// return $this->redirect('Tasks::index');
	}
}

?>