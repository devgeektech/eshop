<!DOCTYPE html>
<html>
<?php $this->load->view('seller/include-head.php'); ?>

<body class="hold-transition sidebar-mini layout-fixed ">
    <div class=" wrapper ">
        <?php $this->load->view('seller/pages/' . $main_page); ?>
    </div>
    <?php $this->load->view('seller/include-script.php'); ?>
</body>

</html>