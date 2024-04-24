<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Attribute_set extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper(['url', 'language', 'timezone_helper']);
		$this->load->model('attribute_model');
	}

	public function index()
	{
		if($this->ion_auth->logged_in() && $this->ion_auth->is_seller() && ($this->ion_auth->seller_status() == 1 || $this->ion_auth->seller_status() == 0)){
			$this->data['main_page'] = TABLES . 'manage-attribute-set';
			$settings = get_settings('system_settings', true);
			$this->data['title'] = 'Attribute Set | ' . $settings['app_name'];
			$this->data['meta_description'] = 'Attribute Set  | ' . $settings['app_name'];
			$this->load->view('seller/template', $this->data);
		} else {
			redirect('seller/login', 'refresh');
		}
	}

	public function attribute_set_list()
	{
		if($this->ion_auth->logged_in() && $this->ion_auth->is_seller() && ($this->ion_auth->seller_status() == 1 || $this->ion_auth->seller_status() == 0)){
			return $this->attribute_model->get_attribute_set_list();
		} else {
			redirect('seller/login', 'refresh');
		}
	}
}
